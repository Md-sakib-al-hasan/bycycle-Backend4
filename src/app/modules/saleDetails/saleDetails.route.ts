import express from 'express';
import { SaleDeatilsController } from './saleDetails.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/sales',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  SaleDeatilsController.getSalesDetails,
);

export const SalesDeatilsRoutes = router;
