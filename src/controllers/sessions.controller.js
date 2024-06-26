import service from "../services/users.service.js";
import { sendResetPasswordEmail } from "../utils/sendEmail.utils.js";
import { verifytoken } from "../utils/token.utils.js";

class SessionsController {
  constructor() {
    this.service = service;
  }
  register = async (req, res, next) => {
    const { email, name, verifiedCode } = req.user;
    await service.register({ email, name, verifiedCode });
    try {
      return res.success201("Registered!");
    } catch (error) {
      return next(error);
    }
  };
  login = async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'None',
          secure: true   
        })
        .success200("Logged in!");
    } catch (error) {
      return next(error);
    }
  };

  isAuth = async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      const userData = verifytoken(token);
      if (!userData) {
        return res.status(401).json({ message: "Invalid token" });
      }
      const user = await service.readOne(userData._id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      return next(error);
    }
  };

  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").success200("Signed out!");
    } catch (error) {
      return next(error);
    }
  };
  verifyAccount = async (req, res, next) => {
    try {
      const { email, verifiedCode } = req.body;
      const user = await service.readByEmail(email);
      if (user.verifiedCode === verifiedCode) {
        await service.update(user._id, { verified: true });
        return res.json({
          statusCode: 200,
          message: "Verified user!",
        });
      } else {
        return res.json({
          statusCode: 400,
          message: "Invalid verified token!",
        });
      }
    } catch (error) {
      return next(error);
    }
  };
  recoveryPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await service.readByEmail(email);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      await sendResetPasswordEmail(user);
      return res.status(200).json({
        message: "Correo electrónico enviado para restablecer contraseña",
      });
    } catch (error) {
      return next(error);
    }
  };
  verifyTokenAndProceed = async (req, res, next) => {
    try {
      const token = req.params.token;
      console.log("token: " + token);
      if (!token) {
        throw new Error("Token no proporcionado");
      }
      const decodedToken = verifytoken(token);
      const userId = decodedToken.data;
      const user = await service.readOne(userId);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      req.user = user;
      const { newPassword } = req.body;
      await service.updatePassword(user, newPassword);
      return res.success201("Contraseña actualizada");
    } catch (error) {
      return next(error);
    }
  };
  badauth = (req, res, next) => {
    try {
      return res.error401();
    } catch (error) {
      return next(error);
    }
  };
}

export default SessionsController;
const controller = new SessionsController();
const {
  login,
  register,
  isAuth,
  signout,
  badauth,
  verifyAccount,
  recoveryPassword,
  verifyTokenAndProceed,
} = controller;
export {
  login,
  register,
  isAuth,
  signout,
  badauth,
  verifyAccount,
  recoveryPassword,
  verifyTokenAndProceed,
};
