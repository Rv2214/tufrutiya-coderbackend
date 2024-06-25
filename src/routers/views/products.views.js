import { Router } from "express";
import products from "../../data/mongo/products.mongo.js";

const productRouter = Router();


productRouter.get("/", async (req, res, next) => {
  try {
    const isAuthenticated = !!req.user;
    const isAdmin = req.user && req.user.role === "admin";
    const perPage = 4; 
    const page = parseInt(req.query.page) || 1; 
    const options = {
      limit: 4,
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
      return res.render("products", {
        products: [],
        message: "Not found products",
      });
    }
    return res.render("products", {
      products: all.docs,
      next: all.nextPage,
      prev: all.prevPage,
      filter: req.query.title,
      perPage,
      isAdmin,
      isAuthenticated,
    });
  } catch (error) {
    return next(error);
  }
});

productRouter.get("/form", (req, res, next) => {
  try {
    const isAuthenticated = !!req.user;
    const isAdmin = req.user && req.user.role === "admin";
    return res.render("form", {
      isAdmin,
      isAuthenticated,
    });
  } catch (error) {
    next(error);
  }
});

productRouter.get("/real", (req, res, next) => {
  try {
    return res.render("real");
  } catch (error) {
    next(error);
  }
});

export default productRouter;
