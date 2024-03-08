import CustomRouter from "../CustomRouter.js";
/* import { Router } from "express"; */
import usersRouter from "./users.router.js";
import ProductsRouter from "./products.router.js"; 
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.api.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
/* import passport from "../../middlewares/passport.mid.js"; */

const product = new ProductsRouter()
export default class ApiRouter extends CustomRouter{
    init(){
        this.router.use("/users", usersRouter)
        this.router.use("/products", product.getRouter());
        this.router.use("/orders", passCallBackMid("jwt"), ordersRouter)
        this.router.use("/sessions", sessionsRouter)
    }
}

/* apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", passport.authenticate("jwt",{ session: false, failureRedirect: "/api/sessions/badauth" }), ordersRouter);
apiRouter.use("/sessions", sessionsRouter) */
// tambien se usa apiRouter.use("/auth", sessionsRouter)


