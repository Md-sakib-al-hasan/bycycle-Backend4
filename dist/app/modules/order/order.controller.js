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
exports.OrderController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const order_service_1 = require("./order.service");
const config_1 = __importDefault(require("../../config"));
const DOMAIN = config_1.default.domain_fontend;
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { order, paymentURL } = yield order_service_1.OrderServices.createOrderDB(req.body, Number(req.body.quantity));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order created successfully. Redirecting to payment...',
        data: { order, paymentURL },
    });
}));
const paymentSuccess = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tranId } = req.params;
    const updatedOrder = yield order_service_1.OrderServices.handlePaymentSuccess(tranId);
    res.redirect(`${DOMAIN}/shop?message=PaymentSuccessful&tranId=${tranId}&amount=${updatedOrder.price}`);
}));
const paymentFailure = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tranId } = req.params;
    const updatedOrder = yield order_service_1.OrderServices.handlePaymentFailure(tranId);
    res.redirect(`${DOMAIN}/cart/${updatedOrder.productId}?message=PaymentFailed&tranId=${tranId}`);
}));
const paymentCancel = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { tranId } = req.params;
    const updatedOrder = yield order_service_1.OrderServices.handlePaymentCancellation(tranId);
    res.redirect(`${DOMAIN}/cart/${updatedOrder.productId}?message=PaymentCanceled&tranId=${tranId}`);
}));
const handleIPN = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderServices.handleIPN(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'IPN received successfully',
        data: result,
    });
}));
const getallOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderServices.getallOrderDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Succesfully get all order',
        data: result,
    });
}));
const todayallorder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderServices.todayorderDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Succesfully get today all order',
        data: result,
    });
}));
const gettodayallprice = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.OrderServices.getodayallpriceDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Succesfully get today all price',
        data: result,
    });
}));
exports.OrderController = {
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
