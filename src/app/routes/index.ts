import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { ProductRoutes } from '../modules/product/product.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { OrderRoutes } from '../modules/order/order.route';
import { WhitelistRoutes } from '../modules/whitelist/whitelist.route';
import { SalesDeatilsRoutes } from '../modules/saleDetails/saleDetails.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/whitelist',
    route: WhitelistRoutes,
  },
  {
    path: '/salesDetails',
    route: SalesDeatilsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
