"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationOrder = exports.orderSchemaZod = void 0;
const zod_1 = require("zod");
exports.orderSchemaZod = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email('Invalid email format'),
        phone: zod_1.z.string().optional(),
        productId: zod_1.z.string().min(1, 'Product ID is required'),
        quantity: zod_1.z.number().min(1, 'Atlest one mustbe add'),
        img: zod_1.z.string(),
        type: zod_1.z.string(),
        sellShopName: zod_1.z.string(),
        productname: zod_1.z.string(),
    }),
});
exports.validationOrder = {
    orderSchemaZod: exports.orderSchemaZod,
};
