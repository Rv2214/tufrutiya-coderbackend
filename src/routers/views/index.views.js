import CustomRouter from "../CustomRouter.js";
import products from "../../data/mongo/products.mongo.js";
import productRouter from "./products.views.js";
import sessionsRouter from "./sessions.views.js";
import orderRouter from "./orders.views.js";
import isAuth from "../../middlewares/isAuth.js";

export default class ViewsRouter extends CustomRouter {
  init() {
    this.router.use("/products", isAuth, productRouter);
    this.router.use("/sessions", sessionsRouter);
    this.router.use("/orders", isAuth, orderRouter);
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const isAuthenticated = !!req.user;
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
