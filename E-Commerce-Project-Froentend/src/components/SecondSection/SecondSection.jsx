import React from "react";
import "./SecondSection.css";
import image from "../../assets/img7.jpg";
const SecondSection = () => {
  return (
    <section className="second-section-container">
      <div className="second-section-wrapper">
        <div className="second-section-content">
          <img src={image} alt="" />
          <h3>Discover the allure of fashion reinvented!</h3>
          <p>
            Dive into a world of style with our latest collection! Shop now and
            redefine your wardrobe narrative!
          </p>
          <button>SHOP NOW</button>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
