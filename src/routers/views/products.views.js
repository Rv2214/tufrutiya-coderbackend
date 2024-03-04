import { Router } from "express";
/* import product from "../../data/fs/products.fs.js"; */
import { product } from "../../data/mongo/manager.mongo.js";



const productRouter = Router();

///productRouter.get(authenticationMiddleware); 





productRouter.get("/", async (req, res, next) => {
  try {
    const userRole = req.session.role;
    const isAuthenticated = req.session.email ? true : false;  
    const perPage = 10; // Número de productos por página
    const page = parseInt(req.query.page) || 1; // Página actual, predeterminada a 1 si no se proporciona
    const orderAndPaginate = {
      limit: req.query.limit || 20,
      page: req.query.page || 1,
      sort: { title: 1 },
    };
    const filter = {};
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }
    if (req.query.sort === "desc") {
      orderAndPaginate.sort.title = "desc";
    }
    const all = await product.read({ filter, orderAndPaginate });
    console.log(product);

    if (all.docs.lenght === 0) {
      return res.render("products", {
        products: [],
        message: "Not found products",
      });
    }
    const plainProducts = all.docs.map(product => product.toObject());
    return res.render("products", {
      products: plainProducts,
      currentPage: page,
      hasPreviousPage: page > 1,
      perPage,
      userRole, isAuthenticated, isLoggedIn: isAuthenticated   
    });
  } catch (error) {
    return next(error);
  }
});


productRouter.get("/form", (req, res, next) => {
  try {
    const userRole = req.session.role;
    const isAuthenticated = req.session.email ? true : false;  
    return res.render("form", {
      userRole, isAuthenticated, isLoggedIn: isAuthenticated 
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

//falta configurar demas funciones

export default productRouter;
