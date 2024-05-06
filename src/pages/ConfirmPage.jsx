import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import { useCurCanvas } from "../context/CurCanvasContext";
import useCanvas from "../hooks/useCanvas";
import "./confirmpage.css";
import { createOrderItem } from "../api/api";
import baseplate from "../assets/baseplate.webp";
import legopiece from "../assets/legopiece.jpeg";
import { useNavigate } from "react-router";
import OrderIdContext from "../context/OrderIdContext";

function ConfirmPage() {
  const navigate = useNavigate();

  //Initial canvas sizes, scaling to a 4x3 x (24x24 baseplates)
  const canSizes = [
    {
      "-": {
        width: 576,
        height: 768,
        cellSize: 8,
      },
      "+": {
        width: 720,
        height: 960,
        cellSize: 10,
      }
    }
  ]

  const { orderId, setOrderId } = useContext(OrderIdContext);
  const { curCanvas } = useCurCanvas();
  const [currentSize, setCurrentSize] = useState(canSizes[0]["-"]);
  const [colorCount, setColorCount] = useState([
    {
      "color": "",
      "ID": 0,
      "total": "",
    }
  ]);
  

  //Predefined colors with id's
  const colorIDMap = [
    { "color": "rgba(244, 244, 244, 255)", "ID": 1 },
    { "color": "rgba(208, 206, 201, 255)", "ID": 2 },
    { "color": "rgba(178, 180, 178, 255)", "ID": 3 },
    { "color": "rgba(140, 138, 136, 255)", "ID": 4 },
    { "color": "rgba(100, 100, 100, 255)", "ID": 5 },
    { "color": "rgba(22, 22, 22, 255)", "ID": 6 },
    { "color": "rgba(0, 187, 220, 255)", "ID": 7 },
    { "color": "rgba(62, 135, 203, 255)", "ID": 8 },
    { "color": "rgba(51, 63, 72, 255)", "ID": 9 },
    { "color": "rgba(0, 53, 80, 255)", "ID": 10 },
    { "color": "rgba(221, 121, 117, 255)", "ID": 11 },
    { "color": "rgba(197, 70, 68, 255)", "ID": 12 },
    { "color": "rgba(218, 41, 28, 255)", "ID": 13 },
    { "color": "rgba(177, 162, 202, 255)", "ID": 14 },
    { "color": "rgba(142, 127, 174, 255)", "ID": 15 },
    { "color": "rgba(236, 208, 181, 255)", "ID": 16 },
    { "color": "rgba(240, 196, 160, 255)", "ID": 17 },
    { "color": "rgba(250, 170, 141, 255)", "ID": 18 },
    { "color": "rgba(248, 173, 109, 255)", "ID": 19 },
    { "color": "rgba(229, 158, 109, 255)", "ID": 20 },
    { "color": "rgba(189, 154, 122, 255)", "ID": 21 },
    { "color": "rgba(181, 129, 80, 255)", "ID": 22 },
    { "color": "rgba(255, 105, 0e, 255)", "ID": 23 },
    { "color": "rgba(166, 85, 35, 255)", "ID": 24 },
    { "color": "rgba(105, 63, 35, 255)", "ID": 25 },
    { "color": "rgba(78, 53, 36, 255)", "ID": 26 },
    { "color": "rgba(120, 78, 144, 255)", "ID": 27 },
    { "color": "rgba(248, 229, 154, 255)", "ID": 28 },
    { "color": "rgba(213, 200, 151, 255)", "ID": 29 },
    { "color": "rgba(239, 182, 97, 255)", "ID": 30 },
    { "color": "rgba(255, 209, 0, 255)", "ID": 31 },
    { "color": "rgba(255, 163, 0), 255)", "ID": 32 },
    { "color": "rgba(229, 155, 220, 255)", "ID": 33 },
    { "color": "rgba(177, 78, 181, 255)", "ID": 34 },
    { "color": "rgba(174, 164, 111, 255)", "ID": 35 },
    { "color": "rgba(174, 184, 98, 255)", "ID": 36 },
    { "color": "rgba(181, 189, 0, 255)", "ID": 37 },
    { "color": "rgba(239, 215, 229, 255)", "ID": 38 },
    { "color": "rgba(94, 126, 41, 255)", "ID": 39 },
    { "color": "rgba(231, 147, 183, 255)", "ID": 40 },
    { "color": "rgba(207, 87, 138, 255)", "ID": 41 },
    { "color": "rgba(51, 85, 37, 255)", "ID": 42 },
    { "color": "rgba(45, 200, 77, 255)", "ID": 43 },
    { "color": "rgba(0, 154, 68, 255)", "ID": 44 },
  ];

  //Used for canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = currentSize.width;
    canvas.height = currentSize.height;
    let cellSize = currentSize.cellSize;
    
  }, [currentSize]);


  //Counting colors in image and compares to colorIDMap array
  //and assign ID's accordingly
  const countColorsInCells = (ctx) => {
    const aspectRatio = ctx.canvas.width / ctx.canvas.height;
    let imgWidth = ctx.canvas.width;
    let imgHeight = imgWidth / aspectRatio;
  
    const cellSize = currentSize.cellSize;
    const offsetX = (ctx.canvas.width - imgWidth) / 2;
    const offsetY = (ctx.canvas.height - imgHeight) / 2;
  
    const tempColorCount = {}; // Using an object to store color counts
  
    for (let x = offsetX; x + cellSize <= imgWidth + offsetX; x += cellSize) {
      for (let y = offsetY; y + cellSize <= imgHeight + offsetY; y += cellSize) {
        const cellData = ctx.getImageData(x, y, cellSize, cellSize).data;
        const rgba = `rgba(${cellData[0]}, ${cellData[1]}, ${cellData[2]}, ${cellData[3]})`;
  
        if (rgba in tempColorCount) {
          tempColorCount[rgba]++;
        } else {
          tempColorCount[rgba] = 1;
        }
      }
    }
  
    // Matching colors and assigning IDs
    const colorsArray = Object.keys(tempColorCount).map((color) => {
      const colorObj = {
        color,
        total: tempColorCount[color],
        ID: -1, // Initialize ID to -1 as default if no match is found
      };
  
      // Finding matching color in colorIDMap by direct string comparison
      const matchingColor = colorIDMap.find((item) => item.color === colorObj.color);
  
      if (matchingColor) {
        colorObj.ID = matchingColor.ID; // Assigning the ID from colorIDMap
      }
  
      
      return colorObj;
    });
  
    setColorCount(colorsArray); // Update the state with the new color count array
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await createOrderItem({ image: curCanvas, pieces: colorCount  });
    let ORDER_ID = res.data._id;
    setOrderId(ORDER_ID);

    var total = colorCount.reduce((accum,item) => accum + item.total, 0)

    console.log("Lego-bitar:");
    colorCount.forEach(color => {
      console.log("Färg: ", color.color, "Antal: ", color.total);
    });
    console.log("Totalt antal legobitar: ", total);
    navigate("/order")
  }

  const draw = (ctx) => {
      const img = new Image();
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        let imgWidth = ctx.canvas.width;
        let imgHeight = imgWidth / aspectRatio;

        if (imgHeight < ctx.canvas.height) {
          imgHeight = ctx.canvas.height;
          imgWidth = imgHeight * aspectRatio;
        }

        const offsetX = (ctx.canvas.width - imgWidth) / 2;
        const offsetY = (ctx.canvas.height - imgHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);

        countColorsInCells(ctx);
      }
      img.src = curCanvas;
  }

  const canvasRef = useCanvas(draw);

  return (
    <>
      <Header />
      <div className="confirm-page-wrapper">
        <div className="confirm-content">
          <div className="left-section">
            <h2 className="left-section-heading">Här är din färdiga bild</h2>
            <p className="left-section-para">Om du är nöjd med resultatet kan du gå vidare till betällning</p>
            <canvas className="confirm-canvas" ref={canvasRef} />
          </div>

          <div className="right-section">
            <div className="right-section-header">
              <h2 className="right-section-heading">Detta ingår i ditt lego-kit</h2>
              <p className="right-section-para">Här hittar du allt du behöver för att skapa din personliga lego-tavla</p>
            </div>
            <div className="card-container">

              <div className="card">
                <img src={curCanvas} alt="Användarens redigerade bild" />
                <div className="text">
                  <h2 className="title">Bakgrundsmall</h2>
                  <p className="info">Din personliga, "legofierade", bild</p>
                </div>
                <h3 className="amount">1 st</h3>
              </div>

              <div className="card">
                <img src={baseplate} alt="lego 24x24 basplatta" />
                <div className="text">
                  <h2 className="title">Basplatta 24x24 - 4x3</h2>
                  <p className="info">Lego-basplatta, rymmer 24x24 legobitar (1x1). Din lego-tavla består av 4x3 basplattor</p>
                </div>
                <h3 className="amount">12 st</h3>
              </div>

              <div className="card">
                <img src={legopiece} alt="legobit 1x1" />
                <div className="text">
                  <h2 className="title">Legobit 1x1</h2>
                  <p className="info">Legobitar, 1x1, innehåller alla färger som behövs för att lägga din lego-tavla</p>
                </div>
                <h3 className="amount">6912 st</h3>
              </div>
              
            </div>
            <button className="action-btn" onClick={handleSubmit}>Lägg i Kundvagn</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmPage;