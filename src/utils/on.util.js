import winston from "./logger/winston.utils.js"

process.on("exit", (code)=> winston.INFO("el proceso finalizo con codigo", code))
process.on("uncaughtException", (error)=> winston.ERROR("ha ocurrido un error:", error.message))

//console.log(process.pid);
process.exit(1) 