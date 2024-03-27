import { user } from "../data/mongo/manager.mongo.js";

const authenticationMiddleware = async (req, res, next) => {
  try {
    // Verifica si hay una sesión y si existe un correo electrónico en la sesión
    if (req.session && req.session.email) {
      // Busca al usuario en la base de datos usando el correo electrónico de la sesión
      const foundUser = await user.read({ email: req.session.email });
      // Si se encuentra el usuario, establece req.user
      if (foundUser) {
        req.user = foundUser;
        return next(); // Llama a next() para pasar al siguiente middleware o ruta
      }
    }
    // Si no se encuentra el usuario, devuelve un error
    throw new Error('User not found');
  } catch (error) {
    return next(error); // Llama a next con el error si hay algún problema
  }
};

export default authenticationMiddleware;