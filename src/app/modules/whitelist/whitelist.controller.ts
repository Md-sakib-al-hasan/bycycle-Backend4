import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { WhiteListservice } from './whitelist.service';
import httpStatus from 'http-status';

const addWhiteList = catchAsync(async (req, res) => {
  const result = await WhiteListservice.addWhitelsitDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'add whtitlistsuccessfully',
    data: result,
  });
});

const getallWhiteList = catchAsync(async (req, res) => {
  const result = await WhiteListservice.getallWhiteListDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully get all whitelsit',
    data: result,
  });
});

export const WhiteListcontroller = {
  getallWhiteList,
  addWhiteList,
};
