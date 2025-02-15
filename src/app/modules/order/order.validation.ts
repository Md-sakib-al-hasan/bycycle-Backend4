import { z } from 'zod';

export const orderSchemaZod = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().email('Invalid email format'),
    phone: z.string().optional(),
    productId: z.string().min(1, 'Product ID is required'),
    quantity: z.number().min(1, 'Atlest one mustbe add'),
    img: z.string(),
    type: z.string(),
    sellShopName: z.string(),
    productname: z.string(),
  }),
});

export const validationOrder = {
  orderSchemaZod,
};
