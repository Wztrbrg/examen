import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema(
  {
    image: String,
    pieces: Array,
  },
  { timestamps: true },
  { collection: "orderItems" }
);

const OrderItem = mongoose.model("orderItem", orderItemSchema);

export default OrderItem;
