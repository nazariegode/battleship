import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShip } from "@fortawesome/free-solid-svg-icons";
import "./Board.css";

const Board = ({ gameBoard, fireTorpedo, isPlayerBoard, showShips }) => {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const [attackedCells, setAttackedCells] = useState(new Set());

    const handleCellClick = (rowIndex, colIndex) => {
        const cellKey = `${rowIndex}-${colIndex}`;
        if (attackedCells.has(cellKey) || !fireTorpedo) return;

        setAttackedCells(prev => new Set(prev).add(cellKey));
        fireTorpedo(rowIndex, colIndex);
    };

    return (
        <div className="board-container">
            <div className="board-numbers">
                <div className="empty-cell"></div>
                {Array.from({ length: 10 }, (_, index) => (
                    <div key={index} className="number">{index}</div>
                ))}
            </div>

            <div className="board">
                {gameBoard.map((row, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        <div className="letter">{letters[rowIndex]}</div>
                        {row.map((cell, colIndex) => {
                            const isHit = cell === 2;
                            const isMiss = cell === 3;
                            const showShip = isPlayerBoard && showShips && cell === 1; // Mostrar barcos del jugador

                            // Mostrar icono de barco si es un impacto y hay un barco en la celda
                            const showShipOnHit = !isPlayerBoard && isHit && cell === 1;

                            return (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`cell ${isHit ? "hit" : isMiss ? "miss" : ""}`}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                >
                                    {/* Mostrar icono de barco si es el tablero del jugador y showShips es true */}
                                    {showShip && <FontAwesomeIcon icon={faShip} size="lg" />}
                                    {/* Mostrar icono de barco en el tablero de la CPU si fue un impacto y hay un barco en la celda */}
                                    {(isHit || showShipOnHit) && <FontAwesomeIcon icon={faShip} size="lg" />}
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Board;
