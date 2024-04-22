import winston from "../utils/logger/winston.utils.js";

function pathHandler(req, res, next) {
  winston.WARN(`${req.method} ${req.url} not found path`);
  return res.json({
    statusCode: 404,
    url: `${req.method} ${req.url}`,
    message: `not found path`,
  });
}

export default pathHandler;


