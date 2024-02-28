import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

let colecction = "users";
const schema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true, index: true  },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    photo: {
      type: String,
      default: "https://i.postimg.cc/cCCFsWB0/userdefault.webp",
    },
    age: { type: Number, default: 0 },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);

const User = model(colecction, schema);

export default User;
