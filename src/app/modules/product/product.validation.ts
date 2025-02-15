import { string, z } from 'zod';

// Zod validation schema for the TProduct type
export const productSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    model: z.string().min(1, 'Model is required'),
    company: z.string().min(1, 'Company is required'),
    price: z.string().min(1, 'Price is required'),
    type: z.string().min(1, 'Type is required'),
    size: z.string().min(1, 'Size is required'),
    quantity: z.number().min(0, 'Quantity must be a non-negative number'),
    img: z.string().min(1, 'Image URL is required'),
  }),
});

export const productDeletedSchema = z.object({
  body: z.object({
    id: string().min(1, 'Must be Enter Product Id'),
  }),
});

export const ProductValiditon = {
  productSchema,
  productDeletedSchema,
};
