/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';
export interface Tuser {
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  phone: string;
  address: string;
  order: Types.ObjectId[];
  whitelist: Types.ObjectId[];
  lastLogin: Date;
  gender: 'Male' | 'Female' | 'other';
  role: 'superAdmin' | 'admin' | 'customer';
  status: 'inactive' | 'active';
  isDeleted: boolean;
}

export interface UserModel extends Model<Tuser> {
  isUserExistsByEmail(id: string): Promise<Tuser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
