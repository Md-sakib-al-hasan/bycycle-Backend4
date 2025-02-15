import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

export const orderSchema = new Schema<TOrder>(
  {
    name: String,
    email: String,
    productname: String,
    productId: String,
    phone: String,
    price: String,
    paidStatus: String,
    tranId: String,
    payment: Date,
    quantity: String,
    img: String,
    type: String,
    sellShopName: String,
  },
  {
    timestamps: true,
  },
);

const Order = model<TOrder>('Order', orderSchema);

export default Order;
