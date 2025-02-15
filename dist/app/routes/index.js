"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/User/user.route");
const product_route_1 = require("../modules/product/product.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const order_route_1 = require("../modules/order/order.route");
const whitelist_route_1 = require("../modules/whitelist/whitelist.route");
const saleDetails_route_1 = require("../modules/saleDetails/saleDetails.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/product',
        route: product_route_1.ProductRoutes,
    },
    {
        path: '/order',
        route: order_route_1.OrderRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/whitelist',
        route: whitelist_route_1.WhitelistRoutes,
    },
    {
        path: '/salesDetails',
        route: saleDetails_route_1.SalesDeatilsRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
