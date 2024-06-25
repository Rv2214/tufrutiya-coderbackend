import CustomRouter from "../CustomRouter.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import {
  register,
  login,
  signout,
  badauth,
  verifyAccount,
  recoveryPassword,
  verifyTokenAndProceed,
} from "../../controllers/sessions.controller.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passCallBack("register"), register);
    this.create("/login", ["PUBLIC"], passCallBack("login"), login);
    this.create(
      "/signout",
      ["USER", "ADMIN", "PREM"],
      passCallBack("jwt"),
      signout
    );
    this.read("/badauth", ["PUBLIC"], badauth);
    this.create("/forgot-password", ["PUBLIC"], recoveryPassword);
    this.update("/resetpassword/:token", ["PUBLIC"], verifyTokenAndProceed);
    this.use("/verify-account", verifyAccount);
    this.use("/isauth", passCallBack("jwt"), (req, res) => {
      res.json({ user: req.user });
    });
  }
}

let sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
