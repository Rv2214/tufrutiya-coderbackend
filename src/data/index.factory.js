import argsUtils from "../utils/args.utils.js";
import dbConnection from "../utils/db.js"
console.log(argsUtils);

const environment = argsUtils.env;

let dao = {}

switch (environment) {
    case "test":
        console.log("MEMORY CONNECTED");
        const { default: productsMemory } = await import("./memory/products.memory.js")
        dao = { products : productsMemory }
        break;
    case "dev":
        console.log("FS CONNECTED");
        const { default: productsFs } = await import ("./fs/products.fs.js")
        const { default: usersFs } = await import("./fs/users.fs.js")
        const { default: ordersFs } = await import("./fs/orders.fs.js")
        dao = { products: productsFs, users: usersFs, orders: ordersFs}
        break;
    case "prod":
    //vamos a usar MONGO
    //aca es necesario configurar la conexión de mongo
    dbConnection()
    .then(() => console.log("MONGO CONNECTED"))
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