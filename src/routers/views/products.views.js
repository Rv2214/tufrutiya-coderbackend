import { Router } from "express";
import products from "../../data/mongo/products.mongo.js";
/* import product from "../../data/fs/products.fs.js"; */

const productRouter = Router();

///productRouter.get(authenticationMiddleware);

productRouter.get("/", async (req, res, next) => {
  try {
    const isAuthenticated = !!req.user;
    // Determina si el usuario es un administrador (esto depende de cómo se estructura el token)
    const isAdmin = req.user && req.user.role === "admin";
    const perPage = 4; // Número de productos por página
    const page = parseInt(req.query.page) || 1; // Página actual, predeterminada a 1 si no se proporciona
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
    // Determina si el usuario es un administrador (esto depende de cómo se estructura el token)
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
