"use strict";
/* eslint-disable no-unused-vars */
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
exports.UserServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const http_status_codes_1 = require("http-status-codes");
const createUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield user_model_1.User.isUserExistsByEmail(payload.email);
    if (existsUser) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'The account already exists');
    }
    const user = yield user_model_1.User.create(payload);
    return user;
});
const updateUserDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const existsUser = yield user_model_1.User.isUserExistsByEmail(user.useremail);
    if (!existsUser) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'You are not update this');
    }
    const updatedUser = yield user_model_1.User.findOneAndUpdate({ email: existsUser.email }, payload, {
        new: true,
    });
    return updatedUser;
});
const getAlluserDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const userQeuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(['name', 'price', 'company', 'size'])
        .filter()
        .sort()
        .paginate();
    const result = yield userQeuery.modelQuery;
    const meta = yield userQeuery.countTotal();
    return { result, meta };
});
const checkAndUpdateUserStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const inactiveUsers = yield user_model_1.User.find({
        lastLogin: { $lte: twoDaysAgo },
        status: 'active',
        isDeleted: false,
    });
    if (inactiveUsers.length > 0) {
        yield user_model_1.User.updateMany({ _id: { $in: inactiveUsers.map((user) => user._id) } }, { $set: { status: 'inactive' } });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
});
const singleUserBD = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const reuslt = yield user_model_1.User.findOne({ email });
    if (!reuslt) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user Not found');
    }
    return reuslt;
});
exports.UserServices = {
    createUserDB,
    updateUserDB,
    getAlluserDB,
    singleUserBD,
    checkAndUpdateUserStatus,
};
