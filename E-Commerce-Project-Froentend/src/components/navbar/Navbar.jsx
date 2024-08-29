import { memo, useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { HiShoppingBag } from "react-icons/hi2";
import { FaBars } from "react-icons/fa"; // Import hamburger icon

import "./navbar.css";
import { useCart } from "../../context/cart/useCart";

const Navbar = ({ categories, isLoading }) => {
  const { totalQuntaty } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartPage, setIsCartPage] = useState(false); // State to track cart page
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu toggle

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleCartIconClick = () => {
    setIsCartPage(true);
    navigate("/cart");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className={`nav ${isScrolled ? "scrolled" : ""} ${
        isCartPage ? "cart-page" : ""
      }`}
    >
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" style={{ textDecoration: "none" }}>
            Logo
          </Link>
          <FaBars className="hamburger" onClick={toggleMenu} />
        </div>
        <div className={`nav-right ${isMenuOpen ? "show" : ""}`}>
          <Link className="nav-link" to="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link className="nav-link" to="/product" onClick={toggleMenu}>
            Shop
          </Link>
          <Link className="nav-link" to="/aboutus" onClick={toggleMenu}>
            About Us
          </Link>
          <Link className="nav-link" to="/contactus" onClick={toggleMenu}>
            Contact Us
          </Link>
          <div className="catagory-select">
            {categories && categories.length > 0 && (
              <select
                className="form-select"
                onChange={(e) => {
                  navigate(`/products/${e.target.value}`);
                  setIsMenuOpen(false); // Close menu after selection
                }}
              >
                <option value="" disabled selected>
                  Category
                </option>

                {categories.map((item, idx) => (
                  <option value={item} key={idx + 1}>
                    {item}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="cart-icon-container" onClick={handleCartIconClick}>
            <HiShoppingBag color="white" fontSize={32} />
            {totalQuntaty > 0 && (
              <div className="cart-badge">{totalQuntaty}</div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
