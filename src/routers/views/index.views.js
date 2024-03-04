import { Router } from "express";

/* import isLoggedInMid from "../../middlewares/isLoggedIn.mid.js"; */
import productRouter from "./products.views.js";
import sessionsRouter from "./sessions.views.js";
import passport from "../../middlewares/passport.mid.js";
import orderRouter from "./orders.views.js";


const viewsRouter = Router();



viewsRouter.get("/", (req, res, next) => {
  try {
    const date = new Date();
    const userRole = req.session.role;
    const isAuthenticated = req.session.email ? true : false;
    

    return res.render("index", { date, userRole, isAuthenticated, isLoggedIn: isAuthenticated });
  } catch (error) {
    next(error);
  }
});


viewsRouter.use("/products", productRouter);
viewsRouter.use("/sessions", sessionsRouter);
viewsRouter.use("/orders", orderRouter);

export default viewsRouter;
