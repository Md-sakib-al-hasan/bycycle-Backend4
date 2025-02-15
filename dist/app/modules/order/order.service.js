"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = __importDefault(require("../product/product.model"));
const order_model_1 = __importDefault(require("./order.model"));
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const config_1 = __importDefault(require("../../config"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const mongoose_1 = __importDefault(require("mongoose"));
const store_id = config_1.default.SSLcommer_store_id;
const store_passwd = config_1.default.SSLcommer_password;
const is_live = false;
const createOrderDB = (payload, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const tranId = `txn_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
    // Find the product
    const product = yield product_model_1.default.findOne({ id: payload.productId });
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This product does not exist');
    }
    // Calculate total price
    const price = (Number(quantity) * Number(product.price)) / 20 +
        (Number(quantity) * Number(product.price)) / 10 +
        Number(quantity) * Number(product.price);
    // Prepare payment data using dynamic config
    const data = {
        total_amount: price,
        currency: 'BDT',
        tran_id: tranId,
        success_url: `${config_1.default.domain_backend}/api/v1/order/success/${tranId}`,
        fail_url: `${config_1.default.domain_backend}/api/v1/order/fail/${tranId}`,
        cancel_url: `${config_1.default.domain_backend}/api/v1/order/cancel/${tranId}`,
        ipn_url: `${config_1.default.domain_backend}/api/v1/order/ipn`,
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
    const sslcz = new sslcommerz_lts_1.default(store_id, store_passwd, is_live);
    // Await the payment initiation
    const apiResponse = yield sslcz.init(data);
    const GatewayPageURL = apiResponse.GatewayPageURL;
    // Create order with payment pending status
    const finalOrder = Object.assign(Object.assign({}, payload), { paidStatus: false, tranId,
        price,
        quantity, payment: new Date() });
    const result = yield order_model_1.default.create(finalOrder);
    return { order: result, paymentURL: GatewayPageURL };
});
const handlePaymentSuccess = (tranId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const result = yield order_model_1.default.findOneAndUpdate({ tranId }, { paidStatus: 'completed' }, { new: true, session });
        if (!result) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Transaction ID not found');
        }
        const product = yield product_model_1.default.findOne({ id: result.productId }).session(session);
        if (!product) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found');
        }
        yield product_model_1.default.findOneAndUpdate({ id: result.productId }, { quantity: String(Number(product.quantity) - Number(result.quantity)) }, { session });
        yield session.commitTransaction();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        yield session.abortTransaction();
        throw new Error(err.message || 'Transaction failed');
    }
    finally {
        session.endSession();
    }
});
const handlePaymentFailure = (tranId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findOneAndUpdate({ tranId }, { paidStatus: 'failed' }, { new: true });
    if (!order) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    return order;
});
const handlePaymentCancellation = (tranId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.default.findOneAndUpdate({ tranId }, { paidStatus: 'canceled' }, { new: true });
    if (!order) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    return order;
});
const handleIPN = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { tran_id, status: paymentStatus } = payload;
    const order = yield order_model_1.default.findOne({ tranId: tran_id });
    if (!order) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    if (paymentStatus === 'VALID') {
        order.paidStatus = 'complted';
        yield order.save();
        return { message: ' Payment successfully verified', order };
    }
    else if (paymentStatus === 'FAILED') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, ' Payment failed');
    }
    else if (paymentStatus === 'CANCELLED') {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, ' Payment was canceled');
    }
    else {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, ' Invalid payment status');
    }
});
const getallOrderDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const getOrderQuery = new QueryBuilder_1.default(order_model_1.default.find(), query)
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
    const result = yield getOrderQuery.modelQuery;
    const meta = yield getOrderQuery.countTotal();
    return { result, meta };
});
const todayorderDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const orderCount = yield order_model_1.default.countDocuments({
        payment: {
            $gte: startOfDay,
            $lt: endOfDay,
        },
    });
    return orderCount;
});
const getodayallpriceDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const orders = yield order_model_1.default.find({
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
});
exports.OrderServices = {
    createOrderDB,
    handlePaymentSuccess,
    handlePaymentCancellation,
    handlePaymentFailure,
    handleIPN,
    getallOrderDB,
    todayorderDB,
    getodayallpriceDB,
};
