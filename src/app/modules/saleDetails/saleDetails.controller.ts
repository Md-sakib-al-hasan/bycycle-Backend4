import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SalesDeatilsServerice } from './saleDetails.service';

const getSalesDetails = catchAsync(async (req, res) => {
  const result = await SalesDeatilsServerice.getSalesDetails(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Succesfully get all SalesDetials',
    data: result,
  });
});

export const SaleDeatilsController = {
  getSalesDetails,
};
