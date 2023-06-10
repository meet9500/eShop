import { Router } from "express";
import * as UserCtrl from "../../controller/user/user.js";
import { authenticateToken } from "../../middleware/authMiddleware.js";

const routes = new Router();
const PATH = {
  LOGIN: "/login",
  REGISTER: "/register",
  LIST_SHOP: "/list/shop",
  LIST_PRODUCT: "/list/product",
};

routes.route(PATH.REGISTER).post(UserCtrl.registerUser);
routes.route(PATH.LOGIN).post(UserCtrl.userLogin);
routes.route(PATH.LIST_SHOP).get([authenticateToken], UserCtrl.listShop);
routes.route(PATH.LIST_PRODUCT).get([authenticateToken], UserCtrl.listProduct);

export default routes;
