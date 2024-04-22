import service from "../services/products.service.js";
import CustomError from "../utils/errors/CustomError.utils.js";
import errors from "../utils/errors/errors.js";

class ProductsController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };

  read = async (req, res, next) => {
    try {
      const options = {
        limit: req.query.limit || 10,
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
      const all = await this.service.read({ filter, options });
      if(all.docs.length > 0){
        return res.success200(all);
      }else{
        CustomError.new(errors.notFound)
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
        CustomError.new(errors.notFound)
      }
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const data = req.body;
      const one = await this.service.update(pid, data);
      if (one) {
        return res.success200(one);
      } else {
        CustomError.new(errors.notFound)
      }
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { pid } = req.params;

      const one = await this.service.destroy(pid);
      if (one) {
        return res.success200(one);
      } else {
        CustomError.new(errors.notFound)
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
