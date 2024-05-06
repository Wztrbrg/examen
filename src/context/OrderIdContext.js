import React, { createContext, useState } from "react";

const OrderIdContext = createContext();

export const OrderIdProvider = ({ children }) => {
  const [orderId, setOrderId] = useState(null);

  return (
    <OrderIdContext.Provider value={{ orderId, setOrderId }}>
      {children}
    </OrderIdContext.Provider>
  );
};

export default OrderIdContext;
