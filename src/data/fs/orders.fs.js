import fs from "fs";
import crypto from "crypto";
import product from "../../data/fs/products.fs.js";

class OrdersManager {
  static #orders = [];

  constructor(path) {
    this.path = path;
    this.init();
  }

  init() {
    try {
      const file = fs.existsSync(this.path);
      if (!file) {
        fs.writeFileSync(this.path, JSON.stringify([], null, 2));
      } else {
        const fileContent = fs.readFileSync(this.path, "utf-8");
        if (fileContent.trim() === "") {
          OrdersManager.#orders = [];
        } else {
          OrdersManager.#orders = JSON.parse(fileContent);
        }
      }
    } catch (error) {
      console.log("Error initializing OrdersManager", error.message);
    }
  }

  async create(userId, productId, quantity) {
    try {
      const orderedProduct = product.readOne(productId);

      if (typeof orderedProduct === "string") {
        throw new Error(
          `Error retrieving product with ID ${productId}: ${orderedProduct}`
        );
      }

      if (quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
      }

      const order = {
        id: crypto.randomBytes(12).toString("hex"),
        userId,
        product: orderedProduct,
        quantity,
        createdAt: new Date().toISOString(),
      };

      OrdersManager.#orders.push(order);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(OrdersManager.#orders, null, 2)
      );

      console.log("Order created:", order.id);
      return order.id;
    } catch (error) {
      return error.message;
    }
  }

  readOrders(next) {
    try {
      if (OrdersManager.#orders.length === 0) {
        throw new Error("No se encontraron ordenes");
      } else {
        return OrdersManager.#orders;
      }
    } catch (error) {
      return next(error);
    }
  }

  readOne(userId, next) {
    try {
      const userOrders = OrdersManager.#orders.filter(
        (order) => order.userId === userId
      );
      if (userOrders.length === 0) {
        throw new Error(`order not found ${userId}`);
      } else {
        return userOrders;
      }
    } catch (error) {
      return next(error);
    }
  }

  async destroy(id) {
    try {
      const index = OrdersManager.#orders.findIndex((order) => order.id === id);
      if (index === -1) {
        throw new Error(`No se encontró la orden con ID ${id}`);
      }

      OrdersManager.#orders.splice(index, 1);

      await fs.promises.writeFile(
        this.path,
        JSON.stringify(OrdersManager.#orders, null, 2)
      );

      return {
        message: `Orden eliminada correctamente`,
      };
    } catch (error) {
      throw error; // Puedes dejar el manejo de errores para el middleware o ruta correspondiente
    }
  }
}

const order = new OrdersManager("./src/data/fs/files/orders.json");

export default order;
