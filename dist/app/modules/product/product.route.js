"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const product_validation_1 = require("./product.validation");
const product_controller_1 = require("./product.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post('/create-product', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(product_validation_1.ProductValiditon.productSchema), product_controller_1.ProductController.createProduct);
router.delete('/delete-product', (0, auth_1.default)(user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(product_validation_1.ProductValiditon.productDeletedSchema), product_controller_1.ProductController.deleteProduct);
router.get('/getAllProduct', product_controller_1.ProductController.getallproduct);
router.patch('/getSingleProduct', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.customer, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(product_validation_1.ProductValiditon.productDeletedSchema), product_controller_1.ProductController.getsingelProduct);
exports.ProductRoutes = router;
