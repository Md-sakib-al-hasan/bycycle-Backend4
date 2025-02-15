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
exports.ProductServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const product_model_1 = __importDefault(require("./product.model"));
const product_utils_1 = require("./product.utils");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createProductDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield (0, product_utils_1.generateProductId)();
    const newPrice = String(Number(payload.price) * 0.9);
    const newProductId = Object.assign(Object.assign({}, payload), { id, newPrice });
    const product = yield product_model_1.default.create(newProductId);
    return product;
});
const deletedProductDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const reuslt = yield product_model_1.default.findOneAndUpdate(id, {
        isDeleted: true,
    });
    if (!reuslt) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product isn't Found");
    }
    return reuslt;
});
const getallproductDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const getproductQuery = new QueryBuilder_1.default(product_model_1.default.find({ isDeleted: false }), query)
        .search(['name', 'price', 'company', 'size'])
        .filter()
        .sort()
        .paginate();
    const result = yield getproductQuery.modelQuery;
    const meta = yield getproductQuery.countTotal();
    return { result, meta };
});
const getSingleProductDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findOne({ id: id.id, isDeleted: false });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product isn't Found");
    }
    return result;
});
exports.ProductServices = {
    createProductDB,
    deletedProductDB,
    getallproductDB,
    getSingleProductDB,
};
