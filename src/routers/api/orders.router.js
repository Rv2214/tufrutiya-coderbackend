import CustomRouter from "../CustomRouter.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import {
  create,
  read,
  // report,
  update,
  destroy,
} from "../../controllers/orders.controller.js";

class OrdersRouter extends CustomRouter {
  init() {
    this.create(
      "/:pid",
      ["USER", "PREM", "ADMIN"],
      passCallBack("jwt"),
      create
    );
    this.read("/", ["USER", "PREM", "ADMIN"], passCallBack("jwt"), read);
    this.update("/:oid", ["USER", "PREM", "ADMIN"], update);
    this.destroy("/:oid", ["USER", "PREM", "ADMIN"], destroy);
  }
}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();
