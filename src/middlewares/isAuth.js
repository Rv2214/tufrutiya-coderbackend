import { verifytoken } from "../utils/token.utils.js";

export default function isAuth (req, res, next) {
  try {
    const token = req.cookies.token;
    const userData = verifytoken(token);
    if (userData) {
      req.user = userData;
      return next();
    } else {
      const error = new Error("Bad auth from middleware");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};