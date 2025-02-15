import Product from './product.model';

const findLastProductId = async () => {
  const lastProduct = await Product.findOne(
    {},
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastProduct?.id ? lastProduct.id : undefined;
};

export const generateProductId = async () => {
  let currentId = (0).toString();
  const lastProductId = await findLastProductId();

  const lastProductYear = lastProductId?.substring(0, 4);
  const currentYear = new Date().getFullYear().toString();

  if (lastProductId && lastProductYear === currentYear) {
    currentId = lastProductId.substring(4);
  }

  const incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  const newProductId = `${currentYear}${incrementId}`;

  return newProductId;
};
