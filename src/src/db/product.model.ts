import { Schema, model, Types } from "mongoose";
interface product {
  name: string;
  pricePerUnit: number;
  desc: string;
  vendor: Types.ObjectId;
  images: string[];
}

const productSchema = new Schema<product>({
  name: {
    type: String,
    required: true,
  },
  pricePerUnit: {
    type: Number,
    required: true,
  },
  desc: {
    type: String,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  images: {
    type: [],
    required: true,
  },
});

const Product = model<product>("Product", productSchema);

export default Product;

export { product };
