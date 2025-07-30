import React from "react";
import { useNavigate } from "react-router-dom";
import "./Generate.css";

const GenerateButton = () => {
  const navigate = useNavigate();

  return (
    <div className="GenerateBox" onClick={() => navigate("/generate")}>
      <h2 className="generateText">Generate Career Path</h2>
    </div>
  );
};

export default GenerateButton;
