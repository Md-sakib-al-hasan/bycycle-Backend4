import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValiditons } from './user.validtion';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValiditons.createuserSchema),
  UserControllers.createCustomer,
);
router.put(
  '/update-user',
  auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.superAdmin),
  validateRequest(UserValiditons.updateUserSchema),
  UserControllers.updateUser,
);
router.get(
  '/alluser',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  UserControllers.getAlluser,
);
router.post(
  '/singleUser',
  auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.superAdmin),
  validateRequest(UserValiditons.SingleUserSchema),
  UserControllers.getsingleuser,
);

export const UserRoutes = router;
