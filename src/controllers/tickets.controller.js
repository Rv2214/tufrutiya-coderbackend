import service from "../services/tickets.service.js";
import orderService from "../services/orders.service.js";
import productService from "../services/products.service.js";

class TicketsController {
  constructor() {
    this.service = service;
  }

  create = async (req, res, next) => {
    try {
      let data = req.body;
      const orderId = data.order_id;
      const order = await orderService.readOne(orderId);
      const pid = order.product_id;
      const productId = await productService.readOne(pid);
      if (!order) {
        throw new Error("Order not found");
      }
      data.total_amount = order.quantity * productId.price;

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
        sort: { createdAt: -1 },
        lean: true,
      };

      const userId = req.params.userId; // Obtiene el userId desde los parámetros de la ruta
      const filter = {};

      if (userId) {
        filter.user_id = userId;
      }

      const all = await this.service.read({ filter, options });
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { tid } = req.params;
      const data = req.body;
      const response = await this.service.update(tid, data);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };

  destroy = async (req, res, next) => {
    try {
      const { tid } = req.params;
      const response = await this.service.destroy(tid);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default TicketsController;
const controller = new TicketsController();
const { create, read, update, destroy } = controller;
export { create, read, update, destroy };
