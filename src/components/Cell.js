import React from "react";
import PropTypes from "prop-types";

const Cell = ({ value, onClick }) => {
  const getColor = () => {
    if (value === 2) return "red";     // Impacto
    if (value === 3) return "gray";    // Fallo
    if (value === 1) return "blue";    // Barco
    return "white";                     // Por defecto
  };

  // Estilos de la celda
  const cellStyle = {
    width: "40px",
    height: "40px",
    backgroundColor: getColor(),
    border: "1px solid black",
    display: "inline-block",
    cursor: "pointer",
    transition: "background-color 0.3s, box-shadow 0.3s", // Transición suave
  };

  return (
    <div
      onClick={onClick}
      onKeyPress={(e) => { if (e.key === "Enter") onClick(); }} // Permite el clic con la tecla Enter
      role="button" // Indica que es un botón
      tabIndex={0} // Permite la navegación por teclado
      style={cellStyle}
      onMouseOver={() => { cellStyle.boxShadow = "0 0 5px rgba(0,0,0,0.5)"; }} // Efecto de sombra al pasar el mouse
      onMouseOut={() => { cellStyle.boxShadow = "none"; }} // Quita la sombra al salir
    ></div>
  );
};

// Validación de propiedades
Cell.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cell;
