import service from "../services/products.service.js";
import CustomError from "../utils/errors/CustomError.utils.js";
import errors from "../utils/errors/errors.js";
import winston from "../utils/logger/winston.utils.js";

class ProductsController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      data.user_id = req.one._id;
      const one = await this.service.create(data);
      return res.success201(one);
    } catch (error) {
      return next(error);
    }
  };

read = async (req, res, next) => {
  try {
    let role;
    if (req.one) {
      role = req.one.role;
    }
    
    const options = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      sort: { title: 1 },
      lean: true,
    };
    const filter = {};

    if (role === 1 || role === 'PREM') {
      filter.user_id = { $ne: req.one._id };
    }
    
    if (req.query.title) {
      filter.title = new RegExp(req.query.title.trim(), "i");
    }

    if (req.query.sort === "desc") {
      options.sort.title = "desc";
    }

    if (role !== 1 && role !== 'PREM') {
      delete filter.user_id;
    }
    const products = await this.service.read({ filter, options });

    if (products.docs.length > 0) {
      return res.success200(products);
    } else {
      CustomError.new(errors.notFound);
    }
  } catch (error) {
    return next(error);
  }
};

  readOne = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const one = await this.service.readOne(pid);
      if (one) {
        return res.success200(one);
      } else {
        CustomError.new(errors.notFound);
      }
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const data = req.body;

      const product = await this.service.readOne(pid);
      const userId = product.user_id;
      const role = req.one.role;

      if (role === 1 && req.one._id.equals(userId)) {
        const one = await this.service.update(pid, data);
        if (one) {
          return res.success200(one);
        } else {
          throw new Error("No se pudo actualizar el producto");
        }
      } else if (role === 2) {
        const one = await this.service.update(pid, data);
        if (one) {
          return res.success200(one);
        } else {
          throw new Error("No se pudo actualizar el producto");
        }
      } else {
        CustomError.new(errors.forbidden);
      }
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const product = await this.service.readOne(pid);
      const userId = product.user_id;
      const role = req.one.role;

      if (role === 1 && req.one._id.equals(userId)){
        const deletedProduct = await this.service.destroy(pid);
      if (deletedProduct) {
        return res.success200(deletedProduct);
      } else {
        throw new Error("No se pudo eliminar el producto");
      }
    } else if (role === 2) {
      const deletedProduct = await this.service.destroy(pid);
      if (deletedProduct) {
        return res.success200(deletedProduct);
      } else {
        throw new Error("No se pudo eliminar el producto");
      }
    } else {
      CustomError.new(errors.forbidden);
    }
    } catch (error) {
      return next(error);
    }
  };
}

export default ProductsController;
const controller = new ProductsController();
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy };
