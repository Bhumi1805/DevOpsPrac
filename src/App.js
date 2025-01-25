import React, { useState } from "react";
import "./App.css"; // Add styles for the grid

const GRID_SIZE = 9;
const CELL_SIZE = 50;

// Color regions for the board
const colorRegions = [
  [0, 0, 0, 1, 1, 1, 2, 2, 2],
  [0, 0, 0, 1, 1, 1, 2, 2, 2],
  [0, 0, 0, 1, 1, 1, 2, 2, 2],
  [3, 3, 3, 4, 4, 4, 5, 5, 5],
  [3, 3, 3, 4, 4, 4, 5, 5, 5],
  [3, 3, 3, 4, 4, 4, 5, 5, 5],
  [6, 6, 6, 7, 7, 7, 8, 8, 8],
  [6, 6, 6, 7, 7, 7, 8, 8, 8],
  [6, 6, 6, 7, 7, 7, 8, 8, 8],
];

// Colors for regions
const colors = [
  "#FFDDC1", "#FFABAB", "#FFC3A0", "#D5AAFF",
  "#85E3FF", "#B9FBC0", "#FF9CEE", "#FFCCF9", "#D4A5A5"
];

function App() {
  // Grid state: "Q" for queen, "X" for cross, null for empty
  const [grid, setGrid] = useState(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null))
  );

  const [lastClickTime, setLastClickTime] = useState(0);

  const handleCellClick = (row, col) => {
    const currentTime = Date.now();

    if (currentTime - lastClickTime < 300) {
      // Double-tap: Place or remove a queen
      toggleQueen(row, col);
    } else {
      // Single-tap: Mark or unmark a cross
      toggleCross(row, col);
    }

    setLastClickTime(currentTime);
  };

  const toggleQueen = (row, col) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      if (newGrid[row][col] === "Q") {
        newGrid[row][col] = null; // Remove the queen
      } else {
        newGrid[row][col] = "Q"; // Place a queen
      }
      return newGrid;
    });
  };

  const toggleCross = (row, col) => {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);
      if (newGrid[row][col] === "X") {
        newGrid[row][col] = null; // Unmark the cross
      } else if (newGrid[row][col] === null) {
        newGrid[row][col] = "X"; // Mark as a cross
      }
      return newGrid;
    });
  };

  return (
    <div className="game-container">
      <h1>Queen's Game</h1>
      <div className="grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="cell"
              style={{
                backgroundColor: colors[colorRegions[rowIndex][colIndex]],
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell === "Q" && <span className="queen">♛</span>}
              {cell === "X" && <span className="cross">X</span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
