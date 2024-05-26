import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  report,
  update,
  destroy,
} from "../../controllers/orders.controller.js";

class OrdersRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "PREM", "ADMIN"], create);
    this.read("/bills/:uid", ["ADMIN"], report);
    this.read("/", ["USER", "PREM", "ADMIN"], read);
    this.update("/:oid", ["USER", "PREM", "ADMIN"], update);
    this.destroy("/:oid", ["USER", "PREM", "ADMIN"], destroy);
  }
}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();
