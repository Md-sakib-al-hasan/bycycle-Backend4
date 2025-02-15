"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sales = exports.SalesDetailsSchmea = void 0;
const mongoose_1 = require("mongoose");
exports.SalesDetailsSchmea = new mongoose_1.Schema({
    dayName: String,
    salePercentage: Number,
}, {
    timestamps: true,
});
exports.Sales = (0, mongoose_1.model)('sales', exports.SalesDetailsSchmea);
