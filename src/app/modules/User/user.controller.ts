import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createCustomer = catchAsync(async (req, res) => {
  const result = await UserServices.createUserDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user is created succesfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const result = await UserServices.updateUserDB(req.body, req.user!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user  is update succesfully',
    data: result,
  });
});

const getAlluser = catchAsync(async (req, res) => {
  const result = await UserServices.getAlluserDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully get all user',
    data: result,
  });
});
const getsingleuser = catchAsync(async (req, res) => {
  const result = await UserServices.singleUserBD(req.body.email);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Succesfully get single user',
    data: result,
  });
});

export const UserControllers = {
  createCustomer,
  updateUser,
  getsingleuser,
  getAlluser,
};
