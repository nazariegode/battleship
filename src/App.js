import React, { useState } from "react";
import Board from "./components/Board";
import "./App.css";

// Función para colocar barcos en el tablero de forma aleatoria
const placeShip = (board, length) => {
    const isHorizontal = Math.random() < 0.5; // 50% de probabilidad de ser horizontal
    let row, col;

    // Intentar colocar el barco
    let placed = false;
    while (!placed) {
        // Seleccionar una posición aleatoria
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);

        // Verificar si se puede colocar el barco
        if (isHorizontal) {
            if (col + length <= 10 && board[row].slice(col, col + length).every(cell => cell === 0)) {
                // Colocar barco
                for (let i = 0; i < length; i++) {
                    board[row][col + i] = 1;
                }
                placed = true; // Barco colocado exitosamente
            }
        } else {
            if (row + length <= 10 && board.slice(row, row + length).every(r => r[col] === 0)) {
                // Colocar barco
                for (let i = 0; i < length; i++) {
                    board[row + i][col] = 1;
                }
                placed = true; // Barco colocado exitosamente
            }
        }
    }
};

// Función para generar un tablero con barcos aleatorios
const generateBoardWithShips = () => {
    const board = Array(10).fill(null).map(() => Array(10).fill(0));

    // Definición de barcos por longitud
    const shipLengths = [5, 4, 3, 3, 2, 2, 1, 1, 1, 1]; // Total de 10 barcos

    // Colocar cada barco en el tablero
    shipLengths.forEach(length => {
        placeShip(board, length);
    });

    return board;
};

// Componente principal de la aplicación
function App() {
    const [playerBoard, setPlayerBoard] = useState(generateBoardWithShips()); // Generar el tablero del jugador con barcos
    const [cpuBoard, setCpuBoard] = useState(generateBoardWithShips()); // Generar el tablero de la CPU con barcos
    const [playerHits, setPlayerHits] = useState(0); // Contador de impactos del jugador
    const [cpuHits, setCpuHits] = useState(0); // Contador de impactos del CPU

    const fireTorpedo = (rowIndex, colIndex) => {
        const updatedCpuBoard = [...cpuBoard];

        // Verificar si el ataque es válido
        if (updatedCpuBoard[rowIndex][colIndex] === 1) {
            updatedCpuBoard[rowIndex][colIndex] = 2; // Impacto
            setPlayerHits(playerHits + 1); // Incrementa el contador de impactos del jugador
        } else if (updatedCpuBoard[rowIndex][colIndex] === 0) {
            updatedCpuBoard[rowIndex][colIndex] = 3; // Fallo
        }

        setCpuBoard(updatedCpuBoard); // Actualiza el tablero de la CPU
        cpuAttack(); // Llama al ataque del CPU después del ataque del jugador
    };

    const cpuAttack = () => {
        // Continuar atacando hasta que encuentre una celda no atacada
        let attacked = false;
        while (!attacked) {
            const randomRow = Math.floor(Math.random() * 10);
            const randomCol = Math.floor(Math.random() * 10);
            const updatedPlayerBoard = [...playerBoard];

            if (updatedPlayerBoard[randomRow][randomCol] === 0) {
                updatedPlayerBoard[randomRow][randomCol] = 3; // Fallo del CPU
                attacked = true; // El CPU atacó exitosamente
            } else if (updatedPlayerBoard[randomRow][randomCol] === 1) {
                updatedPlayerBoard[randomRow][randomCol] = 2; // Impacto del CPU
                setCpuHits(cpuHits + 1); // Incrementa el contador de impactos del CPU
                attacked = true; // El CPU atacó exitosamente
            }

            setPlayerBoard(updatedPlayerBoard); // Actualiza el tablero del jugador
        }
    };

    // Determina quién va ganando
    const determineWinner = () => {
        if (playerHits > cpuHits) return "Jugador está ganando";
        if (cpuHits > playerHits) return "CPU está ganando";
        return "Empate";
    };

    return (
        <div className="App">
            <h1>Battleship</h1>
            <p>
                Los colores rojo y blanco indican el resultado de un ataque (disparo) en el tablero:
                <br />
                <strong>Rojo:</strong> Indica que el ataque ha sido un impacto en un barco enemigo.
                <br />
                <strong>Blanco:</strong> Indica que el ataque ha sido un fallo.
            </p>
            <div className="boards">
                <div className="board-container">
                    <h2 className="names">Tablero Jugador</h2>
                    <Board gameBoard={playerBoard} fireTorpedo={() => {}} /> {/* Solo visualizar el tablero del jugador */}
                    <p>Impactos del Jugador: {playerHits}</p>
                </div>
                <div className="board-container">
                    <h2 className="names">Tablero CPU</h2>
                    <Board gameBoard={cpuBoard} fireTorpedo={fireTorpedo} /> {/* Permitir ataques al tablero de la CPU */}
                    <p>Impactos del CPU: {cpuHits}</p>
                </div>
            </div>
            <h2>{determineWinner()}</h2> {/* Muestra quién va ganando */}
        </div>
    );
}

export default App;
