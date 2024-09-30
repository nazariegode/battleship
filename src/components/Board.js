import React from "react";
import "./Board.css";

const Board = ({ gameBoard, fireTorpedo }) => {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  return (
    <div className="board-container">
      <div className="board-numbers">
        <div className="empty-cell"></div>
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index} className="number">
            {index}
          </div>
        ))}
      </div>

      <div className="board">
        {gameBoard.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            <div className="letter">{letters[rowIndex]}</div>
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`cell ${
                  cell === 2 ? "hit" : cell === 3 ? "miss" : ""
                }`}
                onClick={() => fireTorpedo(rowIndex, colIndex)}
              >
                {/* {cell === 1 && <span>🚢</span>} */}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Board;
