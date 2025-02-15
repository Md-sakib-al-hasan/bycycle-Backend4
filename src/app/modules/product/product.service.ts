import status from 'http-status';
import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import Product from './product.model';
import { generateProductId } from './product.utils';
import QueryBuilder from '../../builder/QueryBuilder';

const createProductDB = async (payload: TProduct) => {
  const id = await generateProductId();
  const newPrice = String(Number(payload.price) * 0.9);
  const newProductId = { ...payload, id, newPrice };
  const product = await Product.create(newProductId);
  return product;
};

const deletedProductDB = async (id: Record<string, unknown>) => {
  const reuslt = await Product.findOneAndUpdate(id, {
    isDeleted: true,
  });
  if (!reuslt) {
    throw new AppError(status.NOT_FOUND, "Product isn't Found");
  }
  return reuslt;
};

const getallproductDB = async (query: Record<string, unknown>) => {
  const getproductQuery = new QueryBuilder(
    Product.find({ isDeleted: false }),
    query,
  )
    .search(['name', 'price', 'company', 'size'])
    .filter()
    .sort()
    .paginate();

  const result = await getproductQuery.modelQuery;
  const meta = await getproductQuery.countTotal();

  return { result, meta };
};

const getSingleProductDB = async (id: Record<string, unknown>) => {
  const result = await Product.findOne({ id: id.id, isDeleted: false });
  if (!result) {
    throw new AppError(status.NOT_FOUND, "Product isn't Found");
  }
  return result;
};

export const ProductServices = {
  createProductDB,
  deletedProductDB,
  getallproductDB,
  getSingleProductDB,
};
