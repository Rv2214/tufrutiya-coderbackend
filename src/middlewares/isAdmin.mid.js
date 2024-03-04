import { verifytoken } from "../utils/token.utils.js";

export default (req, res, next) => {
  try {
    const data = verifytoken(req.headers)
    const { role }  = data;
    if (role === 1) {
      return next();
    } else {
      const error = new Error("Forbidden");
      error.statusCode = 403;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
};
