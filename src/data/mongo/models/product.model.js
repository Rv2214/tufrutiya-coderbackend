import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let colecction = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    photo: {
      type: String,
      default: "https://i.postimg.cc/L8ZpLDx3/product-Default.webp",
    },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const Product = model(colecction, schema);

export default Product;
