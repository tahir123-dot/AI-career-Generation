import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Generate from "./Generate";
import "./Main.css";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/generate" element={<Generate />} />
    </Routes>
  );
};

export default App;
