process.on("exit", (code)=> console.log("el proceso finalizo con codigo "+code))
process.on("uncaughtException", (error)=> console.log("ha ocurrido un error: "+error.message))

//console.log(process.pid);
process.exit(1) 