import { z } from 'zod';

export const WhiteListSchemaZod = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    productname: z.string(),
    phone: z.string().optional(),
    price: z.string(),
    img: z.string(),
    type: z.string(),
    sellShopName: z.string(),
    productId: z.string().min(1, 'Product ID is required'),
  }),
});

export const validationWhitelist = {
  WhiteListSchemaZod,
};
