"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post('/create-roder', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.customer, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(order_validation_1.validationOrder.orderSchemaZod), order_controller_1.OrderController.createOrder);
router.post('/success/:tranId', order_controller_1.OrderController.paymentSuccess);
router.post('/fail/:tranId', order_controller_1.OrderController.paymentFailure);
router.post('/cancel/:tranId', order_controller_1.OrderController.paymentCancel);
router.post('/ipn', order_controller_1.OrderController.handleIPN);
router.get('/getAllorder', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.customer, user_constant_1.USER_ROLE.superAdmin), order_controller_1.OrderController.getallOrder);
router.get('/todayAllorder', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.customer, user_constant_1.USER_ROLE.superAdmin), order_controller_1.OrderController.todayallorder);
router.get('/gettodayallprice', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.customer, user_constant_1.USER_ROLE.superAdmin), order_controller_1.OrderController.gettodayallprice);
exports.OrderRoutes = router;
