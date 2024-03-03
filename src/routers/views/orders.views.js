import { Router } from "express";
import { order } from "../../data/mongo/manager.mongo.js";

const orderRouter = Router();

orderRouter.get("/", async (req, res, next) => {
  try {
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
      isAuthenticated: req.session.email ? true : false,
      isLoggedIn: true, // Si llega a este punto, el usuario está autenticado
    });
  } catch (error) {
    return next(error);
  }
});

export default orderRouter;

