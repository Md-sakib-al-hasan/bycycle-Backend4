"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhitelistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const whitelist_validation_1 = require("./whitelist.validation");
const whitelist_controller_1 = require("./whitelist.controller");
const user_constant_1 = require("../User/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/add-whitelist', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.customer, user_constant_1.USER_ROLE.superAdmin), (0, validateRequest_1.default)(whitelist_validation_1.validationWhitelist.WhiteListSchemaZod), whitelist_controller_1.WhiteListcontroller.addWhiteList);
router.get('/allwhitelist', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.customer, user_constant_1.USER_ROLE.superAdmin), whitelist_controller_1.WhiteListcontroller.getallWhiteList);
exports.WhitelistRoutes = router;
