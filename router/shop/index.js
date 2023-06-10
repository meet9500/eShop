import { Router } from "express";
import * as ShopCtrl from "../../controller/shop/shop.js";
// import * as ErrorMiddleware from "../../middleware/validatorError";
// import { validate as UserValidate } from "../../validator/user/user.validator";
// import { CONSTANTS as USER_CONSTANTS } from "../../constants/user/user";
import { authenticateToken } from "../../middleware/authMiddleware.js";
// import { AuthorizationMiddleware } from "../../middleware/authorization";
const routes = new Router();
const PATH = {
  REGISTER: "/register",
  EDIT: "/edit/:shopId",
  DELETE: "/delete/:shopId",
  LIST: "/list",
};

routes.route(PATH.REGISTER).post([authenticateToken], ShopCtrl.registerShop);
routes.route(PATH.EDIT).post([authenticateToken], ShopCtrl.editShop);
routes.route(PATH.DELETE).post([authenticateToken], ShopCtrl.deleteShop);
routes.route(PATH.LIST).post([authenticateToken], ShopCtrl.listShop);
//routes.route(PATH.LOGIN).post(UserCtrl.userLogin);
// routes.route(PATH.LOGIN).post(UserCtrl.userLogin);

export default routes;
