import { Router } from "express";
/* import { user } from "../../data/mongo/manager.mongo.js"; */
import has8char from "../../middlewares/has8char.js";
/* import isValidPass from "../../middlewares/isValidPass.mid.js"; */
import passport from "../../middlewares/passport.mid.js";
import passCallBack from "../../middlewares/passCallBack.mid.js";

const sessionsRouter = Router();

//register
sessionsRouter.post(
  "/register",
  has8char,
/*   passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }), */
  passCallBack("register"),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 201,
        message: "Registered!",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//login
sessionsRouter.post(
  "/login",
/*   passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }), */
  passCallBack("login"),
  async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .json({
          statusCode: 200,
          message: "Logged in!",
          token: req.token,
        });
    } catch (error) {
      return next(error);
    }
  }
);

//google
//login
sessionsRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

//google-callback
sessionsRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/sessions/badauth",
  }),
  async (req, res, next) => {
    try {
      return res.json({
        statusCode: 200,
        message: "Logged in with google!",
        session: req.session,
      });
    } catch (error) {
      return next(error);
    }
  }
);

//views sessions
sessionsRouter.post("/", async (req, res, next) => {
  try {
    if (req.session.email) {
      return res.json({
        statusCode: 200,
        message: "Session with email: " + req.session.email,
      });
    } else {
      const error = new Error("Bad Auth");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
});

//borrar sessions
//signout
sessionsRouter.post(
  "/signout",
  /*   passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/api/sessions/signout/cb",
  }), */
  passCallBack("jwt"),
  async (req, res, next) => {
    try {
      return res.clearCookie("token").json({
        statusCode: 200,
        message: "Signed out",
      });
    } catch (error) {
      return next(error);
    }
  }
);

//badauth
sessionsRouter.get("/badauth", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Bad auth",
    });
  } catch (error) {
    return next(error);
  }
});

//signout/cb
sessionsRouter.get("/signout/cb", (req, res, next) => {
  try {
    return res.json({
      statusCode: 401,
      message: "Already done",
    });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
