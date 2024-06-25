import service from "../services/orders.service.js";
import productService from "../services/products.service.js";

class OrdersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const { pid: productId } = req.params;
      const { quantity } = req.body;

      const userId = req.one._id;
      const role = req.one.role;
      const product = await productService.readOne(productId);

      if (role === 1) {
        const productUserId = product.user_id;
        if (userId.equals(productUserId)) {
          throw new Error("No puedes crear una orden con tu propio producto");
        }
      }
      const orderData = {
        user_id: userId,
        product_id: productId,
        quantity: quantity || 1,
      };
      const response = await this.service.create(orderData);
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
const { create, read, update, destroy } = controller;
export { create, read, update, destroy };
