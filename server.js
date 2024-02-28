import "dotenv/config.js"

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import socketUtils from "./src/utils/socket.utils.js";
import dbConnection from "./src/utils/db.js";
import expressSesssion from "express-session"
import MongoStore from "connect-mongo";


import router from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import __dirname from "./utils.js";

//server
const server = express();
const PORT = process.env.PORT || 8080;
const ready = () => {
    console.log("server ready on port: " + PORT);
    dbConnection();  
}

//server.listen(PORT, ready);
const httpServer = createServer(server)
const socketServer = new Server(httpServer)
httpServer.listen(PORT, ready);
socketServer.on("connection", socketUtils);

//views
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname+"/src/views");

//middlewares
server.use(expressSesssion({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
        ttl: 7 * 24 * 60 * 60,
        mongoUrl: process.env.DB_LINK,
    })
}))
server.use(cookieParser())
server.use(expressSesssion({
    secret: process.env.SECRET_KEY,
    resave: true, //permite que permanezca activa la session
    saveUninitialized: true, //permite mantener una session vacia iniciada
    cookie: { maxAge: 60000 },
}))
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname+"/public"));
server.use(morgan("dev"));


//routers
server.use("/", router); 
server.use(errorHandler);
server.use(pathHandler);



export { socketServer }