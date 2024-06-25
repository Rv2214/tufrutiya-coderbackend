import winston from "./logger/winston.utils.js"

process.on("exit", (code)=> winston.INFO("el proceso finalizo con codigo", code))
process.on("uncaughtException", (error)=> winston.ERROR("ha ocurrido un error:", error.message))

process.exit(1) 