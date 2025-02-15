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
exports.SalesDeatilsServerice = void 0;
const moment_1 = __importDefault(require("moment"));
const order_model_1 = __importDefault(require("../order/order.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const saleDetails_model_1 = require("./saleDetails.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const StoreSalesData = () => __awaiter(void 0, void 0, void 0, function* () {
    const todayName = (0, moment_1.default)().subtract(1, 'days').format('dddd');
    const totalOrder = yield order_model_1.default.countDocuments();
    const totalProduct = yield product_model_1.default.countDocuments();
    // Avoid division by zero
    const salePercentage = totalOrder > 0 ? (totalProduct / totalOrder) * 100 : 0;
    yield saleDetails_model_1.Sales.create({ dayName: todayName, salePercentage });
});
const getSalesDetails = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const getproductQuery = new QueryBuilder_1.default(saleDetails_model_1.Sales.find({}), query)
        .search(['dayName', 'salePercentage'])
        .filter()
        .sort()
        .paginate();
    const result = yield getproductQuery.modelQuery;
    const meta = yield getproductQuery.countTotal();
    return { result, meta };
});
exports.SalesDeatilsServerice = {
    StoreSalesData,
    getSalesDetails,
};
