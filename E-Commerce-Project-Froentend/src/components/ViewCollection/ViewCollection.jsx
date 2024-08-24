import React from "react";
import "./ViewCollection.css";
import image from "../../assets/img5.jpg";
const ViewCollection = () => {
  return (
    <section className="view-collection-section">
      <div className="view-collection-wrapper">
        <div className="view-collection-content">
          <img src={image} alt="" />
          <h3>Explore our exquisite Bag Collection now!</h3>
          <button>VIEW COLLECTION</button>
        </div>
      </div>
    </section>
  );
};

export default ViewCollection;
