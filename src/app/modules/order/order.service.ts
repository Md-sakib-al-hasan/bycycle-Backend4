import status from 'http-status';
import AppError from '../../errors/AppError';
import Product from '../product/product.model';
import { TOrder } from './order.interface';
import Order from './order.model';
import SSLCommerzPayment from 'sslcommerz-lts';
import config from '../../config';
import QueryBuilder from '../../builder/QueryBuilder';
import mongoose from 'mongoose';

const store_id = config.SSLcommer_store_id;
const store_passwd = config.SSLcommer_password;
const is_live = false;

const createOrderDB = async (payload: TOrder, quantity: number) => {
  const tranId = `txn_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

  // Find the product
  const product = await Product.findOne({ id: payload.productId });
  if (!product) {
    throw new AppError(status.NOT_FOUND, 'This product does not exist');
  }

  // Calculate total price
  const price =
    (Number(quantity) * Number(product.price)) / 20 +
    (Number(quantity) * Number(product.price)) / 10 +
    Number(quantity) * Number(product.price);

  // Prepare payment data using dynamic config
  const data = {
    total_amount: price,
    currency: 'BDT',
    tran_id: tranId,
    success_url: `${config.domain_backend}/api/v1/order/success/${tranId}`,
    fail_url: `${config.domain_backend}/api/v1/order/fail/${tranId}`,
    cancel_url: `${config.domain_backend}/api/v1/order/cancel/${tranId}`,
    ipn_url: `${config.domain_backend}/api/v1/order/ipn`,
    cus_name: payload.name,
    cus_email: payload.email,
    cus_phone: payload.phone || '01700000000',
    product_name: payload.productId,
    shipping_method: 'Courier',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };

  const sslcz = new SSLCommerzPayment(
    store_id as string,
    store_passwd as string,
    is_live,
  );

  // Await the payment initiation
  const apiResponse = await sslcz.init(data);
  const GatewayPageURL = apiResponse.GatewayPageURL;

  // Create order with payment pending status

  const finalOrder = {
    ...payload,
    paidStatus: false,
    tranId,
    price,
    quantity,
    payment: new Date(),
  };

  const result = await Order.create(finalOrder);

  return { order: result, paymentURL: GatewayPageURL };
};

const handlePaymentSuccess = async (tranId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await Order.findOneAndUpdate(
      { tranId },
      { paidStatus: 'completed' },
      { new: true, session },
    );

    if (!result) {
      throw new AppError(status.NOT_FOUND, 'Transaction ID not found');
    }

    const product = await Product.findOne({ id: result.productId }).session(
      session,
    );
    if (!product) {
      throw new AppError(status.NOT_FOUND, 'Product not found');
    }

    await Product.findOneAndUpdate(
      { id: result.productId },
      { quantity: String(Number(product.quantity) - Number(result.quantity)) },
      { session },
    );

    await session.commitTransaction();
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    throw new Error(err.message || 'Transaction failed');
  } finally {
    session.endSession();
  }
};

const handlePaymentFailure = async (tranId: string) => {
  const order = await Order.findOneAndUpdate(
    { tranId },
    { paidStatus: 'failed' },
    { new: true },
  );

  if (!order) {
    throw new AppError(status.NOT_FOUND, 'Order not found');
  }

  return order;
};

const handlePaymentCancellation = async (tranId: string) => {
  const order = await Order.findOneAndUpdate(
    { tranId },
    { paidStatus: 'canceled' },
    { new: true },
  );

  if (!order) {
    throw new AppError(status.NOT_FOUND, 'Order not found');
  }

  return order;
};

const handleIPN = async (payload: Record<string, unknown>) => {
  const { tran_id, status: paymentStatus } = payload;

  const order = await Order.findOne({ tranId: tran_id });

  if (!order) {
    throw new AppError(status.NOT_FOUND, 'Order not found');
  }

  if (paymentStatus === 'VALID') {
    order.paidStatus = 'complted';
    await order.save();
    return { message: ' Payment successfully verified', order };
  } else if (paymentStatus === 'FAILED') {
    throw new AppError(status.BAD_REQUEST, ' Payment failed');
  } else if (paymentStatus === 'CANCELLED') {
    throw new AppError(status.BAD_REQUEST, ' Payment was canceled');
  } else {
    throw new AppError(status.BAD_REQUEST, ' Invalid payment status');
  }
};

const getallOrderDB = async (query: Record<string, unknown>) => {
  const getOrderQuery = new QueryBuilder(Order.find(), query)
    .search([
      'name',
      'price',
      'phone',
      'email',
      'productname',
      'type',
      'sellShopName',
    ])
    .filter()
    .sort()
    .paginate();

  const result = await getOrderQuery.modelQuery;
  const meta = await getOrderQuery.countTotal();

  return { result, meta };
};

const todayorderDB = async () => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  const orderCount = await Order.countDocuments({
    payment: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  });

  return orderCount;
};
const getodayallpriceDB = async () => {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));
  const orders = await Order.find({
    payment: {
      $gte: startOfDay,
      $lt: endOfDay,
    },
  });

  let totalPrice = 0;
  orders.forEach((order) => {
    totalPrice += Number(order.price);
  });
  return { orders, totalPrice };
};

export const OrderServices = {
  createOrderDB,
  handlePaymentSuccess,
  handlePaymentCancellation,
  handlePaymentFailure,
  handleIPN,
  getallOrderDB,
  todayorderDB,
  getodayallpriceDB,
};
