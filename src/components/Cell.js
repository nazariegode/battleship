import React from "react";

const Cell = ({ value, onClick }) => {
  const getColor = () => {
    if (value === "hit") return "red";     
    if (value === "miss") return "gray";  
    if (value === "ship") return "blue";  
    return "white";                       
  };

  return (
    <div
      onClick={onClick}
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: getColor(),
        border: "1px solid black",
      }}
    ></div>
  );
};

export default Cell;
