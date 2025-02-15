/* eslint-disable no-unused-vars */

import status from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { Tuser } from './user.interface';
import { User } from './user.model';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';

const createUserDB = async (payload: Tuser) => {
  const existsUser = await User.isUserExistsByEmail(payload.email);
  if (existsUser) {
    throw new AppError(StatusCodes.CONFLICT, 'The account already exists');
  }
  const user = await User.create(payload);
  return user;
};

const updateUserDB = async (payload: Partial<Tuser>, user: JwtPayload) => {
  const existsUser = await User.isUserExistsByEmail(user.useremail);
  if (!existsUser) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not update this');
  }
  const updatedUser = await User.findOneAndUpdate(
    { email: existsUser.email },
    payload,
    {
      new: true,
    },
  );

  return updatedUser;
};

const getAlluserDB = async (query: Record<string, unknown>) => {
  const userQeuery = new QueryBuilder(User.find(), query)
    .search(['name', 'price', 'company', 'size'])
    .filter()
    .sort()
    .paginate();

  const result = await userQeuery.modelQuery;
  const meta = await userQeuery.countTotal();
  return { result, meta };
};

const checkAndUpdateUserStatus = async () => {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const inactiveUsers = await User.find({
    lastLogin: { $lte: twoDaysAgo },
    status: 'active',
    isDeleted: false,
  });

  if (inactiveUsers.length > 0) {
    await User.updateMany(
      { _id: { $in: inactiveUsers.map((user) => user._id) } },
      { $set: { status: 'inactive' } },
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
};

const singleUserBD = async (email: string) => {
  const reuslt = await User.findOne({ email });
  if (!reuslt) {
    throw new AppError(status.NOT_FOUND, 'This user Not found');
  }
  return reuslt;
};

export const UserServices = {
  createUserDB,
  updateUserDB,
  getAlluserDB,
  singleUserBD,
  checkAndUpdateUserStatus,
};
