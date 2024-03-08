import CustomRouter from "../CustomRouter.js";
import { product } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBackMid from "../../middlewares/passCallBack.mid.js";
/* import isCapacityOk from "../../middlewares/isCapacityOk.mid.js"; */
/* import product from "../../data/fs/products.fs.js"; */
/* import propsProducts from "../../middlewares/propsProducts.mid.js"; */
/* import { Router } from "express"; */

export default class ProductsRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["ADMIN","PREM"],
      passCallBackMid("jwt"),
      isAdmin,
      async (req, res, next) => {
        try {
          const data = req.body;
          const response = await product.create(data);
          //return res.json({ statusCode: 201, response });
          return res.success201(response);
        } catch (error) {
          return next(error);
        }
      }
    );
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        const options = {
          limit: req.query.limit || 20,
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
        return res.success200(all);
      } catch (error) {
        return next(error);
      }
    });

    this.read("/:pid", ["PUBLIC"], async (req, res, next) => {
      try {
        const { pid } = req.params;

        const one = await product.readOne(pid);
        if (typeof one === "string") {
          return res.json({
            statusCode: 404,
            message: one,
          });
        } else {
          return res.success200(one);
        }
      } catch (error) {
        return next(error);
      }
    });

    this.destroy("/:pid", ["ADMIN","PREM"], async (req, res, next) => {
      try {
        const { pid } = req.params;

        const one = await product.destroy(pid);
        if (!one) {
          return res.json({
            statusCode: 404,
            message: "Product not found",
          });
        } else {
          console.log(one);
          return res.success200(one);
        }
      } catch (error) {
        return next(error);
      }
    });

    this.update("/:pid", ["ADMIN","PREM"], async (req, res, next) => {
      try {
        const { pid } = req.params;
        const data = req.body;
        const one = await product.update(pid, data);
        return res.success200(one);
      } catch (error) {
        return next(error);
      }
    });
  }
}

/* const productsRouter = Router(); */

/* export default productsRouter; */



    /* productsRouter.put("/:pid/:quantity", isCapacityOk, async (req, res, next) => {
  try {
    const { pid, quantity } = req.params;
    const response = await product.soldProduct(quantity, pid);
    if (response) {
      return res.json({
        statusCode: 200,
        response: {
          message: "Product sold successfully",
          stock: response.stock,
          totalGain: response.totalGain,
        },
      });
    } else {
    }
  } catch (error) {
    return next(error);
  }
}); */