import React from "react";


const RandomCircle = ({ top, left }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: `${top}%`,
        left: `${left}%`,
        width: "81px",
        height: "81px",
        borderRadius: "50%",
        background: "linear-gradient(180deg, #FFC0C0 0%, #AAB9EE 100%)",
      }}
    />
  );
};

const Circle = () => {
  const circles = Array.from({ length: 30 }, () => ({
    top: Math.random() * 90,
    left: Math.random() * 90,
  }));

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      {circles.map((circle, index) => (
        <RandomCircle key={index} top={circle.top} left={circle.left} />
      ))}
    </div>
  );
};

export default Circle;
