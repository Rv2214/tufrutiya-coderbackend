//importan todos los winston desde el index y probar si funciona asi sino importar las args para el env.mode
const persistence = process.env.MODE || "PROD";

let logger;

switch (persistence) {
  case "PROD":
    const { default: winston } = await import("./winston.utils.js");
    logger = winston;
    break;
  default:
    const { default: winstonDev } = await import("./winstonDev.utils.js");
    logger = winstonDev;
    break; 
}

export default logger;
