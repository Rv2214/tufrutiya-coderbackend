import { Router } from "express";

const sessionsRouter = Router();

sessionsRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("register");
  } catch (error) {
    return next(error);
  }
});
sessionsRouter.get("/login", async (req, res, next) => {
  try {
    return res.render("login");
  } catch (error) {
    return next(error);
  }
});

sessionsRouter.get("/resetpassword/:token", async (req, res, next) => {
  try {
    return res.render("forgotpassword",   { token: req.params.token } );
  } catch (error) {
    return next(error);
  }
});


export default sessionsRouter;