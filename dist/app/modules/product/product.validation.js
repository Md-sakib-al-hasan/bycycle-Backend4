"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValiditon = exports.productDeletedSchema = exports.productSchema = void 0;
const zod_1 = require("zod");
// Zod validation schema for the TProduct type
exports.productSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        model: zod_1.z.string().min(1, 'Model is required'),
        company: zod_1.z.string().min(1, 'Company is required'),
        price: zod_1.z.string().min(1, 'Price is required'),
        type: zod_1.z.string().min(1, 'Type is required'),
        size: zod_1.z.string().min(1, 'Size is required'),
        quantity: zod_1.z.number().min(0, 'Quantity must be a non-negative number'),
        img: zod_1.z.string().min(1, 'Image URL is required'),
    }),
});
exports.productDeletedSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: (0, zod_1.string)().min(1, 'Must be Enter Product Id'),
    }),
});
exports.ProductValiditon = {
    productSchema: exports.productSchema,
    productDeletedSchema: exports.productDeletedSchema,
};
