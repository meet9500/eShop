import { Router } from "express";
import * as ShopCtrl from "../../controller/shop/shop.js";
import { authenticateToken } from "../../middleware/authMiddleware.js";

const routes = new Router();
const PATH = {
  REGISTER: "/register",
  EDIT: "/edit/:shopId",
  DELETE: "/delete/:shopId",
};

routes.route(PATH.REGISTER).post([authenticateToken], ShopCtrl.registerShop);
routes.route(PATH.EDIT).patch([authenticateToken], ShopCtrl.updateShop);
routes.route(PATH.DELETE).delete([authenticateToken], ShopCtrl.deleteShop);

export default routes;
