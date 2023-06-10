import { Router } from "express";
import UserRoutes from "./user/index.js";
import ShopRoutes from "./shop/index.js";

const routes = new Router();
const PATH = {
  ROOT: "/",
  USER: "/users",
  SHOP: "/shop",
};

routes.use(PATH.USER, UserRoutes);
routes.use(PATH.SHOP, ShopRoutes);
// routes.use(PATH.SYSTEM, SystemRoutes);

export default routes;
