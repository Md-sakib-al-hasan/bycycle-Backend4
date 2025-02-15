import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ProductServices } from './product.service';
const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully add Product',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.deletedProductDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully delete Product',
    data: result,
  });
});
const getallproduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getallproductDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully get all Product',
    data: result,
  });
});
const getsingelProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.getSingleProductDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully get Product',
    data: result,
  });
});

export const ProductController = {
  createProduct,
  deleteProduct,
  getallproduct,
  getsingelProduct,
};
