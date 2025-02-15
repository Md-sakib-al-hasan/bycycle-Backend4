import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { validationOrder } from './order.validation';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-roder',
  auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.superAdmin),
  validateRequest(validationOrder.orderSchemaZod),
  OrderController.createOrder,
);
router.post('/success/:tranId', OrderController.paymentSuccess);
router.post('/fail/:tranId', OrderController.paymentFailure);
router.post('/cancel/:tranId', OrderController.paymentCancel);
router.post('/ipn', OrderController.handleIPN);
router.get(
  '/getAllorder',
  auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.superAdmin),
  OrderController.getallOrder,
);
router.get(
  '/todayAllorder',
  auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.superAdmin),
  OrderController.todayallorder,
);
router.get(
  '/gettodayallprice',
  auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.superAdmin),
  OrderController.gettodayallprice,
);

export const OrderRoutes = router;
