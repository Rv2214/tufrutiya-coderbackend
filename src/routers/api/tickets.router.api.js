import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  update,
  destroy,
} from "../../controllers/tickets.controller.js";

class TicketsRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], create);
    this.read("/:userId", ["PUBLIC"], read);
    this.update("/:tid", ["PUBLIC"], update);
    this.destroy("/:tid", ["PUBLIC"], destroy);
  }
}

const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();
