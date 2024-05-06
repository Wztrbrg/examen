/* 

Utilities for the canvas,
includes functions for calculating the dominant color of each cell in the grid,
calculating the closest color match to the colors array,
applying the closest color for cells

*/

// Available colors
const colors = [
  "rgba(244, 244, 244, 1)",
  "rgba(208, 206, 201, 1)",
  "rgba(178, 180, 178, 1)",
  "rgba(140, 138, 136, 1)",
  "rgba(100, 100, 100, 1)",
  "rgba(22, 22, 22, 1)",
  "rgba(0, 187, 220, 1)",
  "rgba(62, 135, 203, 1)",
  "rgba(51, 63, 72, 1)",
  "rgba(0, 53, 80, 1)",
  "rgba(221, 121, 117, 1)",
  "rgba(197, 70, 68, 1)",
  "rgba(218, 41, 28, 1)",
  "rgba(177, 162, 202, 1)",
  "rgba(142, 127, 174, 1)",
  "rgba(236, 208, 181, 1)",
  "rgba(240, 196, 160, 1)",
  "rgba(250, 170, 141, 1)",
  "rgba(248, 173, 109, 1)",
  "rgba(229, 158, 109, 1)",
  "rgba(189, 154, 122, 1)",
  "rgba(181, 129, 80, 1)",
  "rgba(255, 105, 0e, 1)",
  "rgba(166, 85, 35, 1)",
  "rgba(105, 63, 35, 1)",
  "rgba(78, 53, 36, 1)",
  "rgba(120, 78, 144, 1)",
  "rgba(248, 229, 154, 1)",
  "rgba(213, 200, 151, 1)",
  "rgba(239, 182, 97, 1)",
  "rgba(255, 209, 0, 1)",
  "rgba(255, 163, 0), 1)",
  "rgba(229, 155, 220, 1)",
  "rgba(177, 78, 181, 1)",
  "rgba(174, 164, 111, 1)",
  "rgba(174, 184, 98, 1)",
  "rgba(181, 189, 0, 1)",
  "rgba(239, 215, 229, 1)",
  "rgba(94, 126, 41, 1)",
  "rgba(231, 147, 183, 1)",
  "rgba(207, 87, 138, 1)",
  "rgba(51, 85, 37, 1)",
  "rgba(45, 200, 77, 1)",
  "rgba(0, 154, 68, 1)",
];

// Function to calculate the closest color match
const findClosestColor = (targetColor) => {
  let closestColor = colors[0];
  let minDistance = getColorDistance(targetColor, closestColor);

  for (let i = 1; i < colors.length; i++) {
    const currentColor = colors[i];
    const distance = getColorDistance(targetColor, currentColor);

    if (distance < minDistance) {
      minDistance = distance;
      closestColor = currentColor;
    }
  }

  return closestColor;
};

// Helper function to calculate the distance between two colors
const getColorDistance = (color1, color2) => {
  const [r1, g1, b1, a1] = color1.slice(5, -1).split(",").map(Number);
  const [r2, g2, b2, a2] = color2.slice(5, -1).split(",").map(Number);

  return Math.sqrt(
    (r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2 + (a2 - a1) ** 2
  );
};

// Function to calculate the dominant color and replace it with the closest color from the array
const calculateDominantColor = (imageData) => {
  const colorCount = {};
  let maxCount = 0;
  let dominantColor = "rgba(0, 0, 0, 0)"; // Default transparent color

  for (let i = 0; i < imageData.data.length; i += 4) {
    const rgba = `rgba(${imageData.data[i]}, ${imageData.data[i + 1]}, ${
      imageData.data[i + 2]
    }, ${imageData.data[i + 3]})`;
    colorCount[rgba] = (colorCount[rgba] || 0) + 1;

    if (colorCount[rgba] > maxCount) {
      maxCount = colorCount[rgba];
      dominantColor = rgba;
    }
  }

  // Find the closest color match
  const closestColor = findClosestColor(dominantColor);

  return closestColor;
};

export { calculateDominantColor };
