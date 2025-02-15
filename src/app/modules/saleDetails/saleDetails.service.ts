import moment from 'moment';
import Order from '../order/order.model';
import Product from '../product/product.model';
import { Sales } from './saleDetails.model';
import QueryBuilder from '../../builder/QueryBuilder';

const StoreSalesData = async () => {
  const todayName = moment().subtract(1, 'days').format('dddd');
  const totalOrder = await Order.countDocuments();
  const totalProduct = await Product.countDocuments();

  // Avoid division by zero
  const salePercentage = totalOrder > 0 ? (totalProduct / totalOrder) * 100 : 0;

  await Sales.create({ dayName: todayName, salePercentage });
};

const getSalesDetails = async (query: Record<string, unknown>) => {
  const getproductQuery = new QueryBuilder(Sales.find({}), query)
    .search(['dayName', 'salePercentage'])
    .filter()
    .sort()
    .paginate();

  const result = await getproductQuery.modelQuery;
  const meta = await getproductQuery.countTotal();
  return { result, meta };
};

export const SalesDeatilsServerice = {
  StoreSalesData,
  getSalesDetails,
};
