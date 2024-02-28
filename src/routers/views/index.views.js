import { Router } from "express";

import productRouter from "./products.views.js";
import sessionsRouter from "./sessions.views.js";
import passport from "../../middlewares/passport.mid.js";


const viewsRouter = Router();



viewsRouter.get("/", (req, res, next) => {
  try {
    const date = new Date();
      const userRole = req.session.role;

    // Determinar si el usuario está autenticado
    const isAuthenticated = req.session.email ? true : false;
    

    // Renderizar la vista con los datos necesarios
    return res.render("index", { date, userRole, isAuthenticated, isLoggedIn: isAuthenticated });
  } catch (error) {
    next(error);
  }
});

viewsRouter.use("/products", productRouter);
viewsRouter.use("/sessions", sessionsRouter);

export default viewsRouter;
