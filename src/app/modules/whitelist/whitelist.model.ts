import { model, Schema } from 'mongoose';
import { TWhiteList } from './whitelist.interface';

export const WhitelistSchema = new Schema<TWhiteList>({
  email: String,
  productname: String,
  productId: String,
  phone: String,
  price: String,
  img: String,
  type: String,
  sellShopName: String,
});

const Whitelist = model<TWhiteList>('Whitelist', WhitelistSchema);

export default Whitelist;
