import React from "react";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import { BsLinkedin } from "react-icons/bs";
const Footer = () => {
  return (
    <div className="footer">
      <div className="e-footer section-padding">
        <div className="e_footer-links">
          <div className="e_footer-links-div">
            <h4>Menu</h4>
            <a href="/home">Home</a>
            <a href="/home">Shop</a>
            <a href="/home">About Us</a>
            <a href="/home">Contact Us</a>
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
            <a href="/terms">
              <div>
                <p>Terms & Condition</p>
              </div>
            </a>
            <a href="/privacy">
              <div>
                <p>Privacy</p>
              </div>
            </a>
            <a href="/sec">
              <div>
                <p>Security</p>
              </div>
            </a>
            <a href="/cookie">
              <div>
                <p>Cookie Declaration</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
