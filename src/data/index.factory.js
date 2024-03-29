import argsUtils from "../utils/args.utils.js";
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
        //vamos a usar MONGO es necesarios configuar la conexionn de mongo
        console.log("MONGO CONNECTED");
        const { default: productsMongo } = await import("./mongo/products.mongo.js")
        dao= { products: productsMongo}
        break; 
    default:
        break;
}

export default dao