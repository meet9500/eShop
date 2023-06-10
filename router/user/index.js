import { Router } from "express";
import * as UserCtrl from "../../controller/user/user.js";
import { authenticateToken } from "../../middleware/authMiddleware.js";
// import * as ErrorMiddleware from "../../middleware/validatorError";
// import { validate as UserValidate } from "../../validator/user/user.validator";
// import { CONSTANTS as USER_CONSTANTS } from "../../constants/user/user";
// import { AuthMiddleware } from "../../middleware/authMiddleware";
// import { AuthorizationMiddleware } from "../../middleware/authorization";
const routes = new Router();
const PATH = {
  LOGIN: "/login",
  REGISTER: "/register",
  LIST_SHOP: "/list/shop",
};

routes.route(PATH.REGISTER).post(UserCtrl.registerUser);
routes.route(PATH.LOGIN).post(UserCtrl.userLogin);
routes.route(PATH.LIST_SHOP).post([authenticateToken], UserCtrl.listShop);
// routes.route(PATH.LOGIN).post(UserCtrl.userLogin);

export default routes;
