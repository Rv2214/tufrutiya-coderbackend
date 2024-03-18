import { fork } from "child_process";
import CustomRouter from "../CustomRouter.js";
import usersRouter from "./users.router.js";
import ProductsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.api.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
/* import { Router } from "express"; */
/* import passport from "../../middlewares/passport.mid.js"; */

const product = new ProductsRouter();
export default class ApiRouter extends CustomRouter {
  init() {
    this.use("/users", usersRouter);
    this.use("/products", product.getRouter());
    this.use("/orders", passCallBackMid("jwt"), ordersRouter);
    this.use("/sessions", sessionsRouter);
    this.read("/sum", ["PUBLIC"], async (req, res) => {
      try {
        const child = fork("./src/utils/sum.utils.js");
        child.send("start");
        child.on("message", (result) => res.success200(result));
      } catch (error) {
        return next(error);
      }
    });
  }
}

/* apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", passport.authenticate("jwt",{ session: false, failureRedirect: "/api/sessions/badauth" }), ordersRouter);
apiRouter.use("/sessions", sessionsRouter) */
// tambien se usa apiRouter.use("/auth", sessionsRouter)
