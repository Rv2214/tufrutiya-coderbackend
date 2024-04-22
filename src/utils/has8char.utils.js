import CustomError from "./errors/CustomError.utils.js";
import errors from "./errors/errors.js";

function has8char(password) {
  if (password.length < 8) {
    /* const error = new Error("Password must have at least 8 characters");
    error.statusCode = 400;
    throw error; */
    CustomError.new(errors.message("Password must have at least 8 characters"))
  }
}

export default has8char;
