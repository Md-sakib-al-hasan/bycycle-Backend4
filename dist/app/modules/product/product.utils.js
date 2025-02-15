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
exports.generateProductId = void 0;
const product_model_1 = __importDefault(require("./product.model"));
const findLastProductId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastProduct = yield product_model_1.default.findOne({}, {
        id: 1,
        _id: 0,
    })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastProduct === null || lastProduct === void 0 ? void 0 : lastProduct.id) ? lastProduct.id : undefined;
});
const generateProductId = () => __awaiter(void 0, void 0, void 0, function* () {
    let currentId = (0).toString();
    const lastProductId = yield findLastProductId();
    const lastProductYear = lastProductId === null || lastProductId === void 0 ? void 0 : lastProductId.substring(0, 4);
    const currentYear = new Date().getFullYear().toString();
    if (lastProductId && lastProductYear === currentYear) {
        currentId = lastProductId.substring(4);
    }
    const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
    const newProductId = `${currentYear}${incrementId}`;
    return newProductId;
});
exports.generateProductId = generateProductId;
