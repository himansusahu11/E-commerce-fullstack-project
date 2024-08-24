import React from "react";
import "./ShopHero.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
const ShopHero = () => {
  return (
    <section className="shop-hero-section">
      <div className="shop-hero_wrapper">
        <div className="shop-hero-content">
          <h1>Shop</h1>
          <div className="home-shop">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span color="white">Home</span>
            </Link>
            <FaAngleDoubleRight />
            <span>Shop</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopHero;
