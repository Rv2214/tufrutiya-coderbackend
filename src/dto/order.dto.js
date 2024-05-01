import argsUtils from "../utils/args.utils.js";
import crypto from "crypto";

class OrderDTO {
  constructor(data) {
    argsUtils.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.user_id = data.user_id;
    this.email = data.email;
    this.product_id = data.product_id;
    this.quantity = data.quantity || 1;
    this.state = data.state || "reserved";
    argsUtils.env !== "prod" && (this.updatedAt = new Date());
    argsUtils.env !== "prod" && (this.createdAt = new Date());
  }
}

export default OrderDTO;