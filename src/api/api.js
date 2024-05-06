import axios from "axios";

const url = "https://examen-8mvq.onrender.com";

//GET
export const getOrderItems = () => axios.get(url + "/orderItems");

export const getOrders = () => axios.get(url + "/orders");

//POST
export const createOrderItem = (orderItem) =>
  axios.post(url + "/orderItems", orderItem);

export const createOrder = (order) => axios.post(url + "/orders", order);
