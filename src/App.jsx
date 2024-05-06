import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CanvasPage from "./pages/CanvasPage";
import ConfirmPage from "./pages/ConfirmPage"
import OrderPage from "./pages/OrderPage";
import { CurCanvasProvider } from "./context/CurCanvasContext";
import { OrderIdProvider } from "./context/OrderIdContext";
import ThanksPage from "./pages/ThanksPage";

function App() {

  return (
    <>
      <BrowserRouter>
        <OrderIdProvider>
          <CurCanvasProvider>
            <Routes>
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="canvas" element={<CanvasPage />}></Route>
              <Route path="confirm" element={<ConfirmPage />}></Route>
              <Route path="order" element={<OrderPage />}></Route>
              <Route path="thanks" element={<ThanksPage />}></Route>
            </Routes>
          </CurCanvasProvider>
        </OrderIdProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
