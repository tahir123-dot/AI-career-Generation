import React from "react";
import Circle from "./Circle";
import "./Hero.css";
import GenerateButton from "./GenerateButton";

const Hero = () => {
  return (
    <>
      <div className="heroContainer">
        <div>
          <Circle />
        </div>
        <div className="hero-Generate-Section">
          <h2 className="hero-Heading">AI CAREER PATH NAVIGATOR</h2>
          <p className="hero-Highlight">
            Get personalized career readmap sogestions powered by TechTahir
          </p>
        </div>
        <div className="generateButton">
          <GenerateButton/>
        </div>
      </div>
    </>
  );
};

export default Hero;
