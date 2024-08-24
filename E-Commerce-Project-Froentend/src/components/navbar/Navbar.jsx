import { memo, useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";
import "./navbar.css";
import { useCart } from "../../context/cart/useCart";

const Navbar = ({ categories, isLoading }) => {
  const { totalQuntaty } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <nav className={`nav ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" style={{ textDecoration: "none" }}>
            Logo
          </Link>
        </div>
        <div className="nav-right">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/product">
            Shop
          </Link>
          <Link className="nav-link" to="/aboutus">
            About Us
          </Link>
          <Link className="nav-link" to="/contactus">
            Contact Us
          </Link>
          <div className="catagory-select">
            {categories && categories.length > 0 && (
              <select
                className="form-select"
                onChange={(e) => navigate(`/products/${e.target.value}`)}
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
          <Link to="/cart" className="cart-icon-container">
            <FaOpencart className="cart-icon" />
            {totalQuntaty && <div className="cart-badge">{totalQuntaty}</div>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
