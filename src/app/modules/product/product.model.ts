import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

// Mongoose schema definition for a Product
const ProductSchema = new Schema<TProduct>(
  {
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
  },
  {
    timestamps: true,
  },
);

// Creating the Product model using the schema
const Product = model<TProduct>('Product', ProductSchema);

export default Product;
