import { z } from 'zod';
import { Gender, UserRole } from './user.constant';

export const createuserSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    phone: z
      .string()
      .min(10, 'Phone number must be at least 10 digits')
      .optional(),
    address: z.string().min(1, 'Address is required').optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    role: z
      .enum([...UserRole] as [string, ...string[]])
      .default('customer')
      .optional(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    email: z.string().email('Invalid email format').optional(),
    phone: z
      .string()
      .min(10, 'Phone number must be at least 10 digits')
      .optional(),
    address: z.string().min(1, 'Address is required').optional(),
    gender: z.enum([...Gender] as [string, ...string[]]).optional(),
    role: z
      .enum([...UserRole] as [string, ...string[]])
      .default('customer')
      .optional(),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    oldpassword: z
      .string()
      .min(6, 'Current password must be at least 6 characters long'),
    newpassword: z
      .string()
      .min(6, 'New password must be at least 6 characters long'),
  }),
});

export const SingleUserSchema = z.object({
  body: z.object({
    email: z.string().email('Must be Enter Eamil'),
  }),
});

export const UserValiditons = {
  createuserSchema,
  updateUserSchema,
  SingleUserSchema,
  changePasswordSchema,
};
