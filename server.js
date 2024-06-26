import env from "./src/utils/env.util.js";
//import env from "./src/utils/env.util.js";

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import socketUtils from "./src/utils/socket.utils.js";
import dbConnection from "./src/utils/db.js";
import expressSession from "express-session";
import cors from "cors";
import MongoStore from "connect-mongo";
import args from "./src/utils/args.utils.js";
import compression from "express-compression";
import cluster from "cluster";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

import IndexRouter from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import __dirname from "./utils.js";
import Handlebars from "handlebars";
import wintson from "./src/middlewares/winston.js";
import winston from "./src/utils/logger/winston.utils.js";
import options from "./src/utils/swagger.js";


//server
const server = express();
const PORT = env.PORT || 8081;
const ready = () => {
  winston.INFO("server ready on port: " + PORT);
};

//server.listen(PORT, ready);
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
socketServer.on("connection", socketUtils);

//views
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");
Handlebars.registerPartial("navbar", "/src/views/partials");

const specs = swaggerJSDoc(options);
//middlewares
server.use("/api/docs", serve, setup(specs));
//cors
server.use(cors({ origin: true, credentials: true }));
server.use(cookieParser(process.env.SECRET, {
  sameSite: 'none',
  secure: true
}));

server.use(
  expressSession({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      ttl: 7 * 24 * 60 * 60,
      mongoUrl: process.env.DB_LINK,
    }),
  })
);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use(wintson);
server.use(compression({ brotli: { enabled: true, zlib: {} } }));

//endpoints
const router = new IndexRouter();
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);

export { socketServer };

winston.INFO("args: ", args);

//clusters
winston.INFO(cluster.isPrimary);
if (cluster.isPrimary) {
  winston.INFO("PRIMARY ID: " + process.pid);
  cluster.fork();
} else {
  winston.INFO("WORKER ID: " + process.pid);
  httpServer.listen(PORT, ready);
}
