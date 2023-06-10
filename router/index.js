import { Router } from "express";
import UserRoutes from "./user/index.js";
import ShopRoutes from "./shop/index.js";
import ProductRoutes from "./product/index.js";

const routes = new Router();
const PATH = {
  USER: "/users",
  SHOP: "/shop",
  PRODUCT: "/product",
};

routes.use(PATH.USER, UserRoutes);
routes.use(PATH.SHOP, ShopRoutes);
routes.use(PATH.PRODUCT, ProductRoutes);

export default routes;
