import { Router } from "express";
import * as ProductpCtrl from "../../controller/product/product.js";
import { authenticateToken } from "../../middleware/authMiddleware.js";
const routes = new Router();
const PATH = {
  REGISTER: "/register/:shopId",
  EDIT: "/edit/:productId",
  DELETE: "/delete/:productId",
};

routes
  .route(PATH.REGISTER)
  .post([authenticateToken], ProductpCtrl.registerProduct);
routes.route(PATH.EDIT).patch([authenticateToken], ProductpCtrl.updateProduct);
routes
  .route(PATH.DELETE)
  .delete([authenticateToken], ProductpCtrl.deleteProduct);

export default routes;
