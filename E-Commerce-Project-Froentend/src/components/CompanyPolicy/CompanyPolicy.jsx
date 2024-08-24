import React from "react";
import "./CompanyPolicy.css";
import { FaLock, FaTruck } from "react-icons/fa";
import { GiAnticlockwiseRotation } from "react-icons/gi";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
const CompanyPolicy = () => {
  return (
    <div className="company-policy-container">
      <div className="company-policy-wrapper">
        <div className="cp-inner">
          <FaLock fontSize={28} />
          <h4>Secure Payments</h4>
          <p>
            Shop with confidence knowing that your transactions are safeguarded.
          </p>
        </div>
        <div className="cp-inner">
          <FaTruck fontSize={28} />
          <h4>Free Shipping</h4>
          <p>
            Shopping with no extra charges – savor the liberty of complimentary
            shipping on every order.
          </p>
        </div>
        <div className="cp-inner">
          <GiAnticlockwiseRotation fontSize={28} />
          <h4>Easy Returns</h4>
          <p>
            With our hassle-free Easy Returns, changing your mind has never been
            more convenient.
          </p>
        </div>
        <div className="cp-inner">
          <FaMagnifyingGlassLocation fontSize={28} />
          <h4>Order Tracking</h4>
          <p>
            Stay in the loop with our Order Tracking feature – from checkout to
            your doorstep.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyPolicy;
