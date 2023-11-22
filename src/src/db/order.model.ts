import { Schema, model, Types } from "mongoose";

interface order {
  orders: [];
  vendor: Types.ObjectId;
  client: Types.ObjectId;
  rider?: Types.ObjectId;
  total: number;
}

const orderSchema = new Schema<order>({
  orders: {
    type: [],
    required: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rider: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = model<order>("Order", orderSchema);
export default Order;
export { orderSchema };
