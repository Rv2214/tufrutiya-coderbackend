import { Router } from "express";
import usersRouter from "./users.router.js";
import productsRouter from "./products.router.js";
import ordersRouter from "./orders.router.js";
import sessionsRouter from "./sessions.router.api.js";


const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/sessions", sessionsRouter)
// tambien se usa apiRouter.use("/auth", sessionsRouter)


export default apiRouter;