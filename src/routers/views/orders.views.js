import { Router } from "express";
import { order } from "../../data/mongo/manager.mongo.js";
import isAuth from "../../middlewares/isAuth.js";

const orderRouter = Router();

orderRouter.get("/", async (req, res, next) => {
  try {
    const isAuthenticated = !!req.user;
    // Determina si el usuario es un administrador (esto depende de cómo se estructura el token)
    const isAdmin = req.user && req.user.role === "admin";
    // Verifica si el usuario está autenticado y obtiene su correo electrónico
    const userEmail = req.session.email;
    console.log(userEmail);

    // Lee las órdenes del usuario actual
    const userOrders = await order.readByEmail(userEmail);
    console.log(userOrders);

    // Renderiza la vista de órdenes
    return res.render("orders", {
      orders: userOrders, // Envía las órdenes encontradas a la vista
      userRole: req.session.role, // Puedes seguir pasando el rol del usuario si lo necesitas
      isAuthenticated,
      isAdmin,
    });
  } catch (error) {
    return next(error);
  }
});

export default orderRouter;
