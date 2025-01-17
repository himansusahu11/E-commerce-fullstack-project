import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import { BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div className="e-footer section-padding">
        <div className="e_footer-links">
          <div className="e_footer-links-div">
            <h4>Menu</h4>
            <Link to="/">Home</Link>
            <Link to="/product">Shop</Link>
            <Link to="/aboutus">About Us</Link>
            <Link to="/contactus">Contact Us</Link>
          </div>
          <div className="e_footer-links-div">
            <h4>Categories</h4>

            <a href="/products/electronics">Electronic</a>
            <a href="/home">Men's Clothing</a>
            <a href="/home">Women's Clothing</a>
            <a href="/home">Jewelery</a>
          </div>
          <div className="e_footer-links-div">
            <h4>Resources</h4>
            <a href="/home">Contact Support</a>
            <a href="/home">FAQ</a>
            <a href="/home">Live Chat</a>
            <a href="/home">Retuns</a>
          </div>
          <div className="e_footer-links-div">
            <h4>Comming Soon</h4>
            <div className="social-media">
              <FaFacebook fontSize={24} color="#4267B2" />
              <IoLogoTwitter fontSize={24} color="#1DA1F2" />
              <GrInstagram fontSize={24} color="#833AB4" />
              <BsLinkedin fontSize={24} color="#0A66C2" />
            </div>
          </div>
        </div>
        <hr />
        <div className="e-footer-below">
          <div className="e-footer-copyright">
            <p>@{new Date().getFullYear()} logo. All right reserved</p>
          </div>
          <div className="e-footer-below-links">
            <a href="/terms">Terms & Condition</a>
            <a href="/privacy">Privacy</a>
            <a href="/sec">Security</a>
            <a href="/cookie">Cookie Declaration</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
