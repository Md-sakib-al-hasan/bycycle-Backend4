import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { OrderServices } from './order.service';
import config from '../../config';

const DOMAIN = config.domain_fontend;

const createOrder = catchAsync(async (req, res) => {
  const { order, paymentURL } = await OrderServices.createOrderDB(
    req.body,
    Number(req.body.quantity),
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully. Redirecting to payment...',
    data: { order, paymentURL },
  });
});

const paymentSuccess = catchAsync(async (req, res) => {
  const { tranId } = req.params;
  const updatedOrder = await OrderServices.handlePaymentSuccess(tranId);
  res.redirect(
    `${DOMAIN}/shop?message=PaymentSuccessful&tranId=${tranId}&amount=${updatedOrder.price}`,
  );
});

const paymentFailure = catchAsync(async (req, res) => {
  const { tranId } = req.params;
  const updatedOrder = await OrderServices.handlePaymentFailure(tranId);
  res.redirect(
    `${DOMAIN}/cart/${updatedOrder.productId}?message=PaymentFailed&tranId=${tranId}`,
  );
});

const paymentCancel = catchAsync(async (req, res) => {
  const { tranId } = req.params;
  const updatedOrder = await OrderServices.handlePaymentCancellation(tranId);
  res.redirect(
    `${DOMAIN}/cart/${updatedOrder.productId}?message=PaymentCanceled&tranId=${tranId}`,
  );
});

const handleIPN = catchAsync(async (req, res) => {
  const result = await OrderServices.handleIPN(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'IPN received successfully',
    data: result,
  });
});

const getallOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.getallOrderDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully get all order',
    data: result,
  });
});
const todayallorder = catchAsync(async (req, res) => {
  const result = await OrderServices.todayorderDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully get today all order',
    data: result,
  });
});
const gettodayallprice = catchAsync(async (req, res) => {
  const result = await OrderServices.getodayallpriceDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully get today all price',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  paymentSuccess,
  paymentFailure,
  paymentCancel,
  handleIPN,
  getallOrder,
  todayallorder,
  gettodayallprice,
};

// src/app/middlewares/auth.d.ts
// import { JwtPayload } from 'jsonwebtoken';

// declare global {
//   namespace Express {
//     interface Request {
//       user: JwtPayload;
//     }
//   }
// }
