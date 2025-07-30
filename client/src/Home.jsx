import React from "react";
import Hero from "./component/Hero";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="container">
        <nav className="inner-Container">
          <div className="Logo-with-AI-Career-Container">
            <li className="Logo"></li>
            <li className="Logo-Text">AI Career</li>
          </div>
          <div className="Home-and-Signup-Container">
            <li>Home</li>
            <li>Signup</li>
          </div>
        </nav>
      </div>
      <Hero />
    </>
  );
};

export default Home;
