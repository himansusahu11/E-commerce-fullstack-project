import React from "react";
import "./ContactUsSection1.css";
import { FaFacebook } from "react-icons/fa6";
import { IoLogoTwitter } from "react-icons/io";
import { GrInstagram } from "react-icons/gr";
import { BsLinkedin } from "react-icons/bs";
const ContactUsSection1 = () => {
  return (
    <div className="contact-section1-wrapper">
      <div className="contact-section1-content">
        <div className="contact-section1-content-first">
          <h6>Get in touch</h6>
          <h4>
            We value the connection with our community and are here to assist in
            any way we can. Feel free to reach out through the following
            channels:
          </h4>
        </div>
        <div className="contact-section1-content-second">
          <div className="contact-section1-left">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <textarea name="message" id="" placeholder="Message"></textarea>
            <button>send</button>
          </div>
          <div className="contact-section1-right">
            <div className="contact-section1-right-first">
              <div className="contact-section1-right-first-left">
                <h6>phone</h6>
                <p>+91 9777611852</p>
              </div>
              <div className="contact-section1-right-first-right">
                <h6>email</h6>
                <p>himansu.sahu11@gmail.com</p>
              </div>
            </div>
            <hr />
            <div className="contact-section1-right-second">
              <h6>Address</h6>
              <p>2972 Westheimer Rd. Santa Ana, Illinois 85486</p>
            </div>
            <hr />
            <div className="contact-section1-right-third">
              <h6>follow us :</h6>
              <div className="social-media">
                <FaFacebook fontSize={24} color="#4267B2" />
                <IoLogoTwitter fontSize={24} color="#1DA1F2" />
                <GrInstagram fontSize={24} color="#833AB4" />
                <BsLinkedin fontSize={24} color="#0A66C2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection1;
