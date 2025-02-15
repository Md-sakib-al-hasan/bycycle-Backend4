"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationWhitelist = exports.WhiteListSchemaZod = void 0;
const zod_1 = require("zod");
exports.WhiteListSchemaZod = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Invalid email format'),
        productname: zod_1.z.string(),
        phone: zod_1.z.string().optional(),
        price: zod_1.z.string(),
        img: zod_1.z.string(),
        type: zod_1.z.string(),
        sellShopName: zod_1.z.string(),
        productId: zod_1.z.string().min(1, 'Product ID is required'),
    }),
});
exports.validationWhitelist = {
    WhiteListSchemaZod: exports.WhiteListSchemaZod,
};
