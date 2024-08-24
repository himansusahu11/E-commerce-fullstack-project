import React from "react";
import "./Hero.css";
const Hero = () => {
  return (
    <section className="Hero-section">
      <div className="hero_wrapper">
        <div className="hero-content">
          <p className="hero-casual">CASUAL & EVERYDAY</p>
          <h1 className="hero-heading">Effortlessly Blend Comfort &</h1>
          <h1 className="hero-heading">Style!</h1>
          <p className="hero-casual">
            Effortlessly blend comfort and style with our Casual & Everyday
            collection, featuring cozy
          </p>
          <p className="hero-casual">
            sweaters, versatile denim, laid-back tees, and relaxed-fit joggers
            for your everyday adventures
          </p>
          <button>VIEW COLLECTION</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
