import { Schema, model, Types } from "mongoose";

interface store {
  vendor: Types.ObjectId;
  products: Types.ObjectId[];
}

const storeSchema = new Schema<store>({
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
});

const Store = model("Store", storeSchema);
export default Store;
