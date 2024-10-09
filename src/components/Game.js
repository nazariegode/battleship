import React, { useState } from "react";
import Board from "./Board";

// Tableros predefinidos
const predefinedPlayerBoard = [
    [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0]
];

const predefinedCpuBoard = [
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
];

const Game = () => {
    const [playerBoard, setPlayerBoard] = useState(predefinedPlayerBoard);
    const [cpuBoard, setCpuBoard] = useState(predefinedCpuBoard);
    const [playerHits, setPlayerHits] = useState(0);
    const [cpuHits, setCpuHits] = useState(0);
    const [message, setMessage] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [showShip, setShowShip] = useState(false); // Estado para mostrar/ocultar barcos

    const fireTorpedo = (rowIndex, colIndex) => {
        if (gameOver) return;

        const updatedCpuBoard = [...cpuBoard];
        if (updatedCpuBoard[rowIndex][colIndex] === 1) {
            updatedCpuBoard[rowIndex][colIndex] = 2; // Impacto
            setPlayerHits(playerHits + 1);
        } else if (updatedCpuBoard[rowIndex][colIndex] === 0) {
            updatedCpuBoard[rowIndex][colIndex] = 3; // Fallo
        }

        setCpuBoard(updatedCpuBoard);
        cpuAttack();
        checkGameOver();
    };

    const cpuAttack = () => {
        if (gameOver) return;

        let attacked = false;
        while (!attacked) {
            const randomRow = Math.floor(Math.random() * 10);
            const randomCol = Math.floor(Math.random() * 10);
            const updatedPlayerBoard = [...playerBoard];

            if (updatedPlayerBoard[randomRow][randomCol] === 0) {
                updatedPlayerBoard[randomRow][randomCol] = 3; // Fallo del CPU
                attacked = true;
            } else if (updatedPlayerBoard[randomRow][randomCol] === 1) {
                updatedPlayerBoard[randomRow][randomCol] = 2; // Impacto del CPU
                setCpuHits(cpuHits + 1);
                attacked = true;
            }

            setPlayerBoard(updatedPlayerBoard);
        }
    };

    const checkGameOver = () => {
        const allPlayerCellsAttacked = playerBoard.flat().every(cell => cell !== 1);
        const allCpuCellsAttacked = cpuBoard.flat().every(cell => cell !== 1);

        if (allPlayerCellsAttacked || allCpuCellsAttacked) {
            setGameOver(true);
            determineWinner();
        }
    };

    const determineWinner = () => {
        if (playerHits > cpuHits) {
            setMessage("¡El jugador ganó!");
        } else if (cpuHits > playerHits) {
            setMessage("¡La CPU ganó!");
        } else {
            setMessage("¡Es un empate!");
        }
    };

    const toggleShowShip = () => {
      setShowShip(prev => !prev); // Cambia el estado al presionar el botón
  };

  return (
      <div>
          <h1>Battleship Game</h1>
          <button onClick={toggleShowShip}>
              {showShip ? "Ocultar Barcos" : "Mostrar Barcos"}
          </button>
          <div className="boards">
              <Board 
                  gameBoard={playerBoard} 
                  fireTorpedo={fireTorpedo} 
                  isPlayerBoard={true} 
                  showShip={showShip} // Pasa el estado al tablero
              />
              <Board 
                  gameBoard={cpuBoard} 
                  fireTorpedo={null} 
                  isPlayerBoard={false} 
                  showShip={false} // Opcional, ya que normalmente no mostrarías barcos de la CPU
              />
          </div>
          <h2>{message}</h2>
          {gameOver && <button onClick={() => window.location.reload()}>Reiniciar Juego</button>}
      </div>
  );
};

export default Game;
