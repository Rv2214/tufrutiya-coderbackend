import { fork } from "child_process";
import CustomRouter from "../CustomRouter.js";
import usersRouter from "./users.router.js";
import ProductsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.api.js";
import commentsRouter from "./comments.router.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
import winstonUtils from "../../utils/logger/winston.utils.js";


const product = new ProductsRouter();
export default class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/products", product.getRouter());
    this.use("/orders", ordersRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/comments", commentsRouter);
    this.read("/sum", ["PUBLIC"], async (req, res) => {
      try {
        winston.INFO("global process id: " + process.pid);
        const child = fork("./src/utils/sum.utils.js");
        child.send("start");
        child.on("message", (result) => res.success200(result));
      } catch (error) {
        return next(error);
      }
    });
  }
}


