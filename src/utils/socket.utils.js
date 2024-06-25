import { socketServer } from "../../server.js";
import product from "../data/fs/products.fs.js";
import propsProductsUtils from "./propsProducts.utils.js";

export default (socket) => {
  socket.emit("welcome", "Welcome to my ecommerce");
  socket.emit("products", product.read());
  socket.on("new product", async (data) => {
    try {
      propsProductsUtils(data)
      await product.create(data);
      socketServer.emit("product created", "Successfully created");
      socketServer.emit("products", product.read());
    } catch (error) {
    }
  });
};
