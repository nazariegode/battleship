import React, { useState } from "react";
import Board from "./Board";

// Función para generar un tablero vacío de 10x10
const generateEmptyBoard = () => {
  return Array(10).fill(null).map(() => Array(10).fill(null));
};

// Función para colocar los barcos en el tablero (lógica simplificada)
const placeRandomShips = (board) => {
  const newBoard = [...board];
  let shipsPlaced = 0;
  
  while (shipsPlaced < 5) { // Colocamos 5 barcos de forma aleatoria
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    if (newBoard[row][col] === null) {
      newBoard[row][col] = "ship"; // Colocamos un barco
      shipsPlaced++;
    }
  }
  return newBoard;
};

const Game = () => {
  // Tableros para jugador y CPU
  const [playerBoard, setPlayerBoard] = useState(placeRandomShips(generateEmptyBoard()));
  const [cpuBoard, setCpuBoard] = useState(placeRandomShips(generateEmptyBoard()));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Controla el turno del jugador

  // Lógica para cuando el jugador hace clic en el tablero de la CPU
  const handlePlayerClick = (row, col) => {
    if (!isPlayerTurn || cpuBoard[row][col] === "hit" || cpuBoard[row][col] === "miss") return;

    // Simula el disparo del jugador en el tablero del CPU
    const newCpuBoard = [...cpuBoard];
    newCpuBoard[row][col] = newCpuBoard[row][col] === "ship" ? "hit" : "miss";
    setCpuBoard(newCpuBoard);

    setIsPlayerTurn(false); // Cambia el turno al CPU

    // Turno del CPU después de un segundo
    setTimeout(cpuTurn, 1000);
  };

  // Lógica para el turno del CPU
  const cpuTurn = () => {
    let row, col;
    let validShot = false;

    // El CPU busca una celda que no haya atacado antes
    while (!validShot) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      if (playerBoard[row][col] !== "hit" && playerBoard[row][col] !== "miss") {
        validShot = true; // Encuentra una celda no atacada
      }
    }

    const newPlayerBoard = [...playerBoard];

    // Simula el disparo del CPU al tablero del jugador
    newPlayerBoard[row][col] = newPlayerBoard[row][col] === "ship" ? "hit" : "miss";
    setPlayerBoard(newPlayerBoard);
    setIsPlayerTurn(true); // Después del turno del CPU, es el turno del jugador
  };

  return (
    <div>
      <h1>Battleship Game</h1>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <h2>CPU Board (Click to Attack)</h2>
          {/* El jugador hace clic en el tablero del CPU para atacar */}
          <Board gameBoard={cpuBoard} fireTorpedo={handlePlayerClick} />
        </div>
        <div>
          <h2>Your Board</h2>
          {/* El tablero del jugador muestra el resultado de los ataques del CPU */}
          <Board gameBoard={playerBoard} fireTorpedo={() => {}} /> {/* El jugador no puede interactuar con su propio tablero */}
        </div>
      </div>
    </div>
  );
};

export default Game;
