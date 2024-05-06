/* 

Canvas component handles displaying and fitting the uploaded image correctly,
Dividing the canvas in to a grid where each cell corresponds to one lego piece in scale,
Calculating the dominant color of each cell,
Comparing the dominant color to an array of pre-defined colors,
Fills each cell with their respective dominant (closest) color. 

*/

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCanvas from "../hooks/useCanvas";
import "./canvas.css"
import { 
  calculateDominantColor } from "../utils/canvasUtils";
import AdjustmentSliders from "./AdjustmentSliders";
import ZoomButtons from "./ZoomButtons";
import { useCurCanvas } from "../context/CurCanvasContext";


function Canvas({ file, image, onCancel }) {
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

  //States for canvas-size, brightness, contrast and saturation
  const [currentSize, setCurrentSize] = useState(canSizes[0]["-"]);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(1);
  const [saturation, setSaturation] = useState(1);
  const { curCanvas, setCurCanvas } = useCurCanvas();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await createItem({ image: curCanvas });    
    

    navigate("/confirm");

  }

  const handleCancel = () => {
    onCancel();
  }
  
  //Used for zooming in/out on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = currentSize.width;
    canvas.height = currentSize.height;
    let cellSize = currentSize.cellSize;
    
  }, [currentSize]);

   // Functions for brightness, contrast and saturation adjustments
   const applyImageAdjustments = (imageData, brightness, contrast, saturation) => {
    const data = imageData.data;
  
    const adjustment = (value, adjustmentValue) =>
      Math.round(((value - 128) * adjustmentValue) + 128);
  
    for (let i = 0; i < data.length; i += 4) {
      // Apply brightness
      data[i] = adjustment(data[i], contrast) + brightness;
      data[i + 1] = adjustment(data[i + 1], contrast) + brightness;
      data[i + 2] = adjustment(data[i + 2], contrast) + brightness;
  
      // Apply contrast
      data[i] = adjustment(data[i], contrast);
      data[i + 1] = adjustment(data[i + 1], contrast);
      data[i + 2] = adjustment(data[i + 2], contrast);
  
      // Apply saturation
      const grayscale =
        0.2989 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = saturation * data[i] + (1 - saturation) * grayscale;
      data[i + 1] = saturation * data[i + 1] + (1 - saturation) * grayscale;
      data[i + 2] = saturation * data[i + 2] + (1 - saturation) * grayscale;
    }
  
    return imageData;
  };
  
  
  // Draw function for rendering image to the canvas
  const draw = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const gridOverlay = (context) => {
      const canvasWidth = context.canvas.width;
      const canvasHeight = context.canvas.height;
  
      context.strokeStyle = "#ccc"; // Grid color
      context.lineWidth = 0.5;
  
      // Draw vertical lines
      for (let x = 0; x <= canvasWidth; x += currentSize.cellSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvasHeight);
        context.stroke();
      }
  
      // Draw horizontal lines
      for (let y = 0; y <= canvasHeight; y += currentSize.cellSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvasWidth, y);
        context.stroke();
      }
    }

    // Function dividing canvas into grid
    const innerDrawGrid = (context) => {

      // Calculate number of rows and columns based on canvas size and cell size
      const numRows = Math.floor(context.canvas.height / currentSize.cellSize);
      const numCols = Math.floor(context.canvas.width / currentSize.cellSize);

      // Loop through each cell and extract the image data for each cell
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const x = col * currentSize.cellSize;
          const y = row * currentSize.cellSize;
          const cellImageData = context.getImageData(x, y, currentSize.cellSize, currentSize.cellSize);
          
          //calculate dominant color of each cell in the grid
          const dominantColor = calculateDominantColor(cellImageData);

          //fill each cell with their respective dominant color
          context.fillStyle = dominantColor;
          context.fillRect(x, y, currentSize.cellSize, currentSize.cellSize);
        }
      }
    };
  
    if (image) {
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
        
        // Get the image data after drawing the image
        const imageData = ctx.getImageData(offsetX, offsetY, imgWidth, imgHeight);

        // Apply brightness and contrast adjustments
        const adjustedImageData = applyImageAdjustments(imageData, brightness, contrast, saturation);

        // Put the adjusted image data back onto the canvas
        ctx.putImageData(adjustedImageData, offsetX, offsetY);

       

        innerDrawGrid(ctx);
        setCurCanvas(canvasRef.current.toDataURL());
        gridOverlay(ctx);
      };
      img.src = file;
    } else {
      gridOverlay(ctx);
    }
  }

  const canvasRef = useCanvas(draw);


  return (
    <>
      <div className="canvas-wrapper">
        <div className="sidebar">
          <AdjustmentSliders 
            setBrightness={(brightness) => setBrightness(brightness)}
            setContrast={(contrast) => setContrast(contrast)}
            setSaturation={(saturation) => setSaturation(saturation)}
          />
          <div className="divider"></div>
          <ZoomButtons setCurrentSize={(currentSize) => setCurrentSize(currentSize)} canSizes={canSizes} />
          <div className="divider"></div>
          <div className="action-btn-container">
            <button onClick={handleSubmit} className="action-btn">Fortsätt</button>
            <button onClick={handleCancel} className="cancel-btn">Börja Om</button>
          </div>
        </div>
        <div className="display">
          <canvas className="canvas" ref={canvasRef} />
        </div>
      </div>
    </>
  );
};

export default Canvas;
