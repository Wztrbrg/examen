import React from "react";
import "./zoombuttons.css";

function ZoomButtons({ setCurrentSize, canSizes }) {

  const changeCanvasSize = (size) => {
    setCurrentSize(size);
  };

  return (
    <>
      <div className="zoom-container">
        <h2>Förstora arbetsytan</h2>
        <div className="zoom-btn-container">
          {Object.keys(canSizes[0]).map((sizeKey, index) => (
            <button
              className="zoom-btn"
              key={index}
              onClick={() => changeCanvasSize(canSizes[0][sizeKey])}>
              {sizeKey}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default ZoomButtons;
