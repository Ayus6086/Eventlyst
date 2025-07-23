import React from "react";
import "../Home/Home.css";
import heroImg from "../../assets/hero.gif";
import Navbar from "../../components/navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className="hero">
        <div className="hero__text">
          <h1>Welcome to EventVerse</h1>
          <p>Your gateway to all the world wide events!</p>
          <p>JOIN, CONNECT, EXPLORE, ENGAGE</p>
        </div>
        <div className="hero__image">
          <img src={heroImg} alt="image for events" />
        </div>
      </div>
    </>
  );
}

export default Home;