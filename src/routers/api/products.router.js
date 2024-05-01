import CustomRouter from "../CustomRouter.js";
/* import passCallBackMid from "../../middlewares/passCallBack.mid.js"; */
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/products.controller.js";

export default class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREM"], create);
    this.read("/", [  "PUBLIC", "USER", "PREM", "ADMIN"], read);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.destroy("/:pid", ["ADMIN", "PREM"], destroy);
    this.update("/:pid", ["ADMIN", "PREM"], update);
  }
}
