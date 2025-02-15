import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValiditon } from './product.validation';
import { ProductController } from './product.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-product',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(ProductValiditon.productSchema),
  ProductController.createProduct,
);
router.delete(
  '/delete-product',
  auth(USER_ROLE.superAdmin),
  validateRequest(ProductValiditon.productDeletedSchema),
  ProductController.deleteProduct,
);
router.get('/getAllProduct', ProductController.getallproduct);
router.patch(
  '/getSingleProduct',
  auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.superAdmin),
  validateRequest(ProductValiditon.productDeletedSchema),
  ProductController.getsingelProduct,
);

export const ProductRoutes = router;
