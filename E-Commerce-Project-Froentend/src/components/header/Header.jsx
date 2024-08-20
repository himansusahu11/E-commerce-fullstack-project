import Navbar from "../navbar/Navbar";
import "./header.css";
const Header = (props) => {
  const { categories, isLoading } = props;
  return (
    <>
      <div className="header">
        <Navbar
          className="navbar"
          categories={categories}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default Header;
