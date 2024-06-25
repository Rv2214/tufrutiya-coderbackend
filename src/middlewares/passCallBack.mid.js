import passport from "../middlewares/passport.mid.js";
import CustomError from "../utils/errors/CustomError.utils.js";
import errors from "../utils/errors/errors.js";

export default (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        CustomError.new(
          errors.passCallBack(
            info.message || info.toString(),
            info.statusCode || 401
          )
        );
      }
      req.user = user;
      return next();
    })(req, res, next);
  };
};
