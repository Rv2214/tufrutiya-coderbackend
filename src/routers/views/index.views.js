import CustomRouter from "../CustomRouter.js";
import products from "../../data/mongo/products.mongo.js";
import productRouter from "./products.views.js";
import sessionsRouter from "./sessions.views.js";
import orderRouter from "./orders.views.js";
import isAuth from "../../middlewares/isAuth.js";
//import passport from "../../middlewares/passport.mid.js";
/* import isLoggedInMid from "../../middlewares/isLoggedIn.mid.js"; */
/* import { Router } from "express"; */

export default class ViewsRouter extends CustomRouter {
  init() {
    this.router.use("/products", isAuth, productRouter);
    this.router.use("/sessions", sessionsRouter);
    this.router.use("/orders", isAuth, orderRouter);
    //arreglar esto, sin isAuth se renderizan todos los botones del navbar, con isAuth no se ve nada sin logear...
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const isAuthenticated = !!req.user;
        // Determina si el usuario es un administrador (esto depende de cómo se estructura el token)
        const isAdmin = req.user && req.user.role === "admin";
        const perPage = 3;
        const options = {
          limit: 3,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        const filter = {};
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          options.sort.title = "desc";
        }
        const all = await products.read({ filter, options });
        if (all.docs.length === 0) {
          return res.render("index", {
            products: [],
            message: "Not found products",
          });
        }
        return res.render("index", {
          products: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          filter: req.query.title,
          perPage,
          isAuthenticated,
          isAdmin,
        });
      } catch (error) {
        return next(error);
      }
    });
  }
}

/* viewsRouter.get("/", (req, res, next) => {
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
viewsRouter.use("/orders", orderRouter); */

/* export default viewsRouter; */
