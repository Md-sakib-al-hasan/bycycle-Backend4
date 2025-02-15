"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.orderSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    productname: String,
    productId: String,
    phone: String,
    price: String,
    paidStatus: String,
    tranId: String,
    payment: Date,
    quantity: String,
    img: String,
    type: String,
    sellShopName: String,
}, {
    timestamps: true,
});
const Order = (0, mongoose_1.model)('Order', exports.orderSchema);
exports.default = Order;
