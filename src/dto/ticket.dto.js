import argsUtils from "../utils/args.utils.js";
import crypto from "crypto";

class TicketDTO {
  constructor(data) {
    argsUtils.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.user_id = data.user_id;
    this.order_id = data.order_id;
    this.total_amount = data.total_amount;
    this.status = data.status || "pending";
    argsUtils.env !== "prod" && (this.updatedAt = new Date());
    argsUtils.env !== "prod" && (this.createdAt = new Date());
  }
}

export default TicketDTO;
