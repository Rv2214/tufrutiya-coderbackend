import { user } from "../data/mongo/manager.mongo.js";

const authenticationMiddleware = async (req, res, next) => {
  try {
    if (req.session && req.session.email) {
      const foundUser = await user.read({ email: req.session.email });
      if (foundUser) {
        req.user = foundUser;
        return next(); 
      }
    }
    throw new Error('User not found');
  } catch (error) {
    return next(error); 
  }
};

export default authenticationMiddleware;