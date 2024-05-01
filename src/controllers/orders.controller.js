import service from "../services/orders.service.js";
import productService from "../services/products.service.js";

class OrdersController {
  constructor() {
    this.service = service;
  }
create = async (req, res, next) => {
  try {
    let data = req.body;
    const role = req.one.role;
    const userId = req.one._id;

    const productId = data.product_id;
    const product = await productService.readOne(productId);
      
    console.log("data ", data);
    console.log("role ", role);
    console.log("userId ", userId);
    console.log("product ", product);
    
    if (role === 1) {
      const productUserId = product.user_id;
      if (userId.equals(productUserId)) {
        throw new Error("No puedes crear una orden con tu propio producto");
      }
    }
    if (!data.user_id) {
      data.user_id = userId;
    }
    const response = await this.service.create(data);
    return res.success201(response);
  } catch (error) {
    return next(error);
  }
};

  read = async (req, res, next) => {
    try {
      const options = {
        limit: req.query.limit || 20,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      if (req.one._id) {
        filter.user_id = req.one._id;
      }
      if (req.query.sort === "desc") {
        options.sort.title = "desc";
      }
      const all = await this.service.read({ filter, options });
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };
  report = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const report = await this.service.reportBill(uid);
      return res.json({
        statusCode: 200,
        response: report,
      });
    } catch (error) {
      return next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const response = await this.service.update(oid, data);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const response = await this.service.destroy(oid);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default OrdersController;
const controller = new OrdersController();
const { create, read, report, update, destroy } = controller;
export { create, read, report, update, destroy };
