import QueryBuilder from '../../builder/QueryBuilder';
import { TWhiteList } from './whitelist.interface';
import Whitelist from './whitelist.model';

const addWhitelsitDB = async (payload: TWhiteList) => {
  const result = await Whitelist.create(payload);
  return result;
};

const getallWhiteListDB = async (query: Record<string, unknown>) => {
  const getOrderQuery = new QueryBuilder(Whitelist.find(), query)
    .search(['price', 'phone', 'email', 'productname', 'type', 'sellShopName'])
    .filter()
    .sort()
    .paginate();

  const result = await getOrderQuery.modelQuery;
  const meta = await getOrderQuery.countTotal();

  return { result, meta };
};

export const WhiteListservice = {
  getallWhiteListDB,
  addWhitelsitDB,
};
