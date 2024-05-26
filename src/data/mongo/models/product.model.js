import { model, Schema, Types } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    photo: {
      type: String,
      default: "https://i.postimg.cc/L8ZpLDx3/product-Default.webp",
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
schema.pre("find", function () {
  this.populate("user_id");
});
const Product = model(collection, schema);

export default Product;
