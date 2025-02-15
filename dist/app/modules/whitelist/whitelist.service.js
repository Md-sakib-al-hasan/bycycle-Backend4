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
exports.WhiteListservice = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const whitelist_model_1 = __importDefault(require("./whitelist.model"));
const addWhitelsitDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield whitelist_model_1.default.create(payload);
    return result;
});
const getallWhiteListDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const getOrderQuery = new QueryBuilder_1.default(whitelist_model_1.default.find(), query)
        .search(['price', 'phone', 'email', 'productname', 'type', 'sellShopName'])
        .filter()
        .sort()
        .paginate();
    const result = yield getOrderQuery.modelQuery;
    const meta = yield getOrderQuery.countTotal();
    return { result, meta };
});
exports.WhiteListservice = {
    getallWhiteListDB,
    addWhitelsitDB,
};
