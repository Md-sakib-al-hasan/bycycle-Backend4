"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesDeatilsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const saleDetails_controller_1 = require("./saleDetails.controller");
const user_constant_1 = require("../User/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.get('/sales', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.superAdmin), saleDetails_controller_1.SaleDeatilsController.getSalesDetails);
exports.SalesDeatilsRoutes = router;
