import React from "react";
import "./ThirdSection.css";
import { FaStar } from "react-icons/fa";
const ThirdSection = () => {
  return (
    <section className="third-section-container">
      <div className="third-section-wrapper">
        <div className="third-section-content">
          <div className="rating-wrapper">
            <div className="third-star-icon">
              <FaStar />
            </div>
            <div className="third-star-icon">
              <FaStar />
            </div>
            <div className="third-star-icon">
              <FaStar />
            </div>
            <div className="third-star-icon">
              <FaStar />
            </div>
            <div className="third-star-icon">
              <FaStar />
            </div>
          </div>
          <h4>
            ”FemmeWardrobe is my fashion sanctuary! The curated collection
            effortlessly blends chic trends with timeless elegance, making every
            purchase a delightful discovery. The quality of their pieces is
            unmatched, and I appreciate the brand's commitment to sustainable
            fashion. What truly sets FemmeWardrobe apart is their
            customer-centric approach.”
          </h4>
          <h6>Sarah M., Devoted FemmeWardrobe Fan</h6>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
