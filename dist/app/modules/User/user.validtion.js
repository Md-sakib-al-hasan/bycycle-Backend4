"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValiditons = exports.SingleUserSchema = exports.changePasswordSchema = exports.updateUserSchema = exports.createuserSchema = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
exports.createuserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required'),
        email: zod_1.z.string().email('Invalid email format'),
        password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
        phone: zod_1.z
            .string()
            .min(10, 'Phone number must be at least 10 digits')
            .optional(),
        address: zod_1.z.string().min(1, 'Address is required').optional(),
        gender: zod_1.z.enum([...user_constant_1.Gender]).optional(),
        role: zod_1.z
            .enum([...user_constant_1.UserRole])
            .default('customer')
            .optional(),
    }),
});
exports.updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Name is required').optional(),
        email: zod_1.z.string().email('Invalid email format').optional(),
        phone: zod_1.z
            .string()
            .min(10, 'Phone number must be at least 10 digits')
            .optional(),
        address: zod_1.z.string().min(1, 'Address is required').optional(),
        gender: zod_1.z.enum([...user_constant_1.Gender]).optional(),
        role: zod_1.z
            .enum([...user_constant_1.UserRole])
            .default('customer')
            .optional(),
    }),
});
exports.changePasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldpassword: zod_1.z
            .string()
            .min(6, 'Current password must be at least 6 characters long'),
        newpassword: zod_1.z
            .string()
            .min(6, 'New password must be at least 6 characters long'),
    }),
});
exports.SingleUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email('Must be Enter Eamil'),
    }),
});
exports.UserValiditons = {
    createuserSchema: exports.createuserSchema,
    updateUserSchema: exports.updateUserSchema,
    SingleUserSchema: exports.SingleUserSchema,
    changePasswordSchema: exports.changePasswordSchema,
};
