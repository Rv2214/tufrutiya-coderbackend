import "dotenv/config.js"
import argsUtils from "../utils/args.utils.js";
import dbConnection from "../utils/db.js"
import winston from "../utils/logger/winston.utils.js";
/* winston.INFO("argsUtils ", argsUtils); */

const environment = argsUtils.env;

let dao = {}

switch (environment) {
    case "test":
        winston.INFO("MEMORY CONNECTED");
        const { default: productsMemory } = await import("./memory/products.memory.js")
        dao = { products : productsMemory }
        break;
    case "dev":
        winston.INFO("FS CONNECTED");
        const { default: productsFs } = await import ("./fs/products.fs.js")
        const { default: usersFs } = await import("./fs/users.fs.js")
        const { default: ordersFs } = await import("./fs/orders.fs.js")
        dao = { products: productsFs, users: usersFs, orders: ordersFs}
        break;
    case "prod":
    dbConnection()
    .then(() => winston.INFO("MONGO CONNECTED"))
    const { default: productsMongo } = await import("./mongo/products.mongo.js")
    const { default: usersMongo } = await import("./mongo/users.mongo.js")
    const { default: ordersMongo } = await import("./mongo/orders.mongo.js")
    const { default: commentsMongo } = await import("./mongo/comments.mongo.js")
    dao = { products: productsMongo, users: usersMongo, orders: ordersMongo, comments: commentsMongo }
    break;
    default:
    break;
}

export default dao