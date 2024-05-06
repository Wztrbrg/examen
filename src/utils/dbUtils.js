import * as api from "../api/api.js";

//Code for storing in database
export const getOrders = async () => {
  try {
    const { data } = await api.getOrders();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (order) => {
  try {
    const { data } = await api.createOrder(order);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderItems = async () => {
  try {
    const { data } = await api.getOrderItems();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrderItem = async (orderItem) => {
  try {
    const { data } = await api.createOrderItem(orderItem);
    return data;
  } catch (error) {
    console.log(error);
  }
};
