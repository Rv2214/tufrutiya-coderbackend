/* import { Router } from "express"; */
import CustomRouter from "../CustomRouter.js";
import { product } from "../../data/mongo/manager.mongo.js"

/* import isLoggedInMid from "../../middlewares/isLoggedIn.mid.js"; */
import productRouter from "./products.views.js";
import sessionsRouter from "./sessions.views.js";
//import passport from "../../middlewares/passport.mid.js";
import orderRouter from "./orders.views.js";


export default class ViewsRouter extends CustomRouter {
  init(){
    this.router.use("/products", productRouter)
    this.router.use("/sessions", sessionsRouter);
    this.router.use("/orders", orderRouter);
    this.read("/", /* ["PUBLIC"], */ async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 4,
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
        const all = await product.read({ filter, options });
        return res.render("index", {
          events: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          title: "INDEX",
          filter: req.query.title,
        });
      } catch (error) {
        next(error);
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
