import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String
    },
    description: {
      type: String
    },
    qty: {
      type: Number,
      default: 0
    },
    seller_id :{
     type: Schema.Types.ObjectId,
    }
  },
  { timestamps: true }
);

const productModel = model("PRODUCT", productSchema);
export default productModel;
