// CurCanvasContext.js
import React, { createContext, useContext, useState } from "react";

const CurCanvasContext = createContext();

export const useCurCanvas = () => {
  return useContext(CurCanvasContext);
};

export const CurCanvasProvider = ({ children }) => {
  const [curCanvas, setCurCanvas] = useState();

  return (
    <CurCanvasContext.Provider value={{ curCanvas, setCurCanvas }}>
      {children}
    </CurCanvasContext.Provider>
  );
};
