import CustomRouter from "../CustomRouter.js";
import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";
import {
  register,
  login,
  google,
  /*   github,
  me, */
  signout,
  badauth,
  verifyAccount,
  recoveryPassword, verifyTokenAndProceed
} from "../../controllers/sessions.controller.js";

class SessionsRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passCallBack("register"), register);
    this.create("/login", ["PUBLIC"], passCallBack("login"), login);
    this.create(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );
    this.read(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      google
    );
    this.create(
      "/signout",
      ["USER", "ADMIN", "PREM"],
      passCallBack("jwt"),
      signout
    );
    this.read("/badauth", ["PUBLIC"], badauth);
    this.create("/forgot-password", ["PUBLIC"], recoveryPassword )
    this.update("/resetpassword/:token", ["PUBLIC"],  verifyTokenAndProceed )
    this.use("/verify-account", verifyAccount);
  }
}

let sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();
