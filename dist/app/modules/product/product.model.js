"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Mongoose schema definition for a Product
const ProductSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    model: { type: String, required: true },
    company: { type: String, required: true },
    price: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    img: { type: String, required: true },
    newPrice: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    rating: Number,
}, {
    timestamps: true,
});
// Creating the Product model using the schema
const Product = (0, mongoose_1.model)('Product', ProductSchema);
exports.default = Product;
