import { Schema, model } from 'mongoose';
import { Gender, UserRole, UserStatus } from './user.constant';

import bcrypt from 'bcrypt';
import config from '../../config';
import { Tuser, UserModel } from './user.interface';
const userSchema = new Schema<Tuser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    passwordChangedAt: {
      type: Date,
    },
    gender: {
      type: String,
      enum: Gender,
    },
    role: {
      type: String,
      enum: UserRole,
      default: 'customer',
    },
    order: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    whitelist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: UserStatus,
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<Tuser, UserModel>('User', userSchema);
