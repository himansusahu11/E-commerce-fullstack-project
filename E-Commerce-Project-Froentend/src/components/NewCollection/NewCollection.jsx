import React from "react";
import Product from "../product/Product";
import "./NewCollection.css";

const NewCollection = ({ products }) => {
  return (
    <div className="new-collection-wrapper">
      <div className="new-collection-container">
        <div className="new-collection-heading">
          <h1>Newest Collection</h1>
        </div>
        <div className="new-collection-product">
          {products.slice(4, 8).map((product, index) => {
            return <Product key={index} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default NewCollection;
