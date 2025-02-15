"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhitelistSchema = void 0;
const mongoose_1 = require("mongoose");
exports.WhitelistSchema = new mongoose_1.Schema({
    email: String,
    productname: String,
    productId: String,
    phone: String,
    price: String,
    img: String,
    type: String,
    sellShopName: String,
});
const Whitelist = (0, mongoose_1.model)('Whitelist', exports.WhitelistSchema);
exports.default = Whitelist;
