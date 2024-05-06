import Order from "../models/order.js";
export const getOrders = async (req, res) => {
  try {
    const order = await Order.find();
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    await order.save();
    res.status(201).json(order);
  } catch (error) {}
};
