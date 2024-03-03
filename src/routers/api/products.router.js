import { Router } from "express";
import { product } from "../../data/mongo/manager.mongo.js";
/* import product from "../../data/fs/products.fs.js"; */
import propsProducts from "../../middlewares/propsProducts.mid.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import isCapacityOk from "../../middlewares/isCapacityOk.mid.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
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
      return res.json({
        statusCode: 404,
        message: "not found products",
      });
    }
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;

    const one = await product.readOne(pid);
    if (typeof one === "string") {
      return res.json({
        statusCode: 404,
        message: one,
      });
    } else {
      console.log(one);
      return res.json({
        one,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid/:quantity", isCapacityOk, async (req, res, next) => {
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
});

productsRouter.delete("/:pid", async (req, res, next) => {
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
      return res.json({
        statusCode: 200,
        one,
      });
    }
  } catch (error) {
    return next(error);
  }
});

productsRouter.post("/", propsProducts, async (req, res, next) => {
  try {
    const data = req.body;
    const response = await product.create(data);
    return res.json({
      statusCode: 201,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

productsRouter.put("/:pid", propsProducts, async (req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const response = await product.update(pid, data);
    return res.json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
