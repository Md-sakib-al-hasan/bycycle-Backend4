import { model, Schema } from 'mongoose';
import { TSalesDetails } from './saleDetails.interface';

export const SalesDetailsSchmea = new Schema<TSalesDetails>(
  {
    dayName: String,
    salePercentage: Number,
  },
  {
    timestamps: true,
  },
);

export const Sales = model<TSalesDetails>('sales', SalesDetailsSchmea);
