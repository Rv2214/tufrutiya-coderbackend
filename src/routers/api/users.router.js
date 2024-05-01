import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  readOne,
  readByEmail,
  stats,
  update,
  destroy,
  updateRole
} from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:uid", ["PUBLIC"], readOne);
    this.read("/", ["PUBLIC"], readByEmail)
    this.read("/stats", ["USER", "PREM", "ADMIN"], stats);
    this.update("/:uid", ["USER", "PREM", "ADMIN"], update);
    this.destroy("/:uid", ["USER", "PREM", "ADMIN"], destroy);
    this.update("/:uid", ["USER", "PREM", "ADMIN"], updateRole);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
