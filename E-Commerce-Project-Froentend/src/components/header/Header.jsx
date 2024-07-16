import Navbar from "../navbar/Navbar";
import "./header.css";
const Header = (props) => {
  const { categories, isLoading } = props;
  return (
    <>
      <div className="header">
        <Navbar categories={categories} isLoading={isLoading} />
      </div>
    </>
  );
};

export default Header;
