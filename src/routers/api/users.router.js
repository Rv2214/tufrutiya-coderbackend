import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  readOne,
  stats,
  update,
  destroy,
} from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], create);
    this.read("/", ["PUBLIC"], read);
    this.read("/stats", ["USER", "PREM"], stats);
    this.read("/:uid", ["PUBLIC"], readOne);
    this.update("/:uid", ["USER", "PREM"], update);
    this.destroy("/:uid", ["USER", "PREM"], destroy);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
