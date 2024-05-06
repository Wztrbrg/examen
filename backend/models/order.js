import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    email: String,
    phone: String,
    fName: String,
    lName: String,
    adress: String,
    zip: String,
    city: String,
    orderId: String,
  },
  { timestamps: true },
  { collection: "orders" }
);

const Order = mongoose.model("order", orderSchema);

export default Order;
