import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "tickets";
const schema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    order_id: { type: Types.ObjectId, required: true, ref: "orders" },
    total_amount: { type: Number, required: true },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "canceled"],
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.pre("find", function () {
  this.populate("user_id", "name -password -createdAt -updatedAt -__v");
});
schema.pre("find", function () {
  this.populate("order_id", "product_id quantity");
});

const Ticket = model(collection, schema);
export default Ticket;
