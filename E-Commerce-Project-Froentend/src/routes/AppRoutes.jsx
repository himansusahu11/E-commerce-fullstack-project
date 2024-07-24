import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/header/Header";
import PageNotFound from "../pages/pageNotFound/PageNotFound";
import ProductListing from "../pages/productListing/ProductListing";
import CartItems from "../pages/cartItems/CartItem";
import Signup from "../pages/signup/Signup";
import Login from "../pages/login/Login";
import useFetchData from "../hooks/useFetchData";
import useAuth from "../context/auth/useAuth";

const AppRoutes = () => {
  const {
    data: categories,
    error,
    isLoading,
  } = useFetchData("http://localhost:5050/api/product/categories", [], true);
  const { user } = useAuth();

  console.log("Fetched categories: ", categories);
  console.log("Loading state: ", isLoading);
  console.log("Error state: ", error);

  return (
    <Router>
      {user && Object.keys(user).length ? (
        <Header categories={categories?.data} isLoading={isLoading} />
      ) : (
        <></>
      )}

      <Routes>
        <Route path="/products/:categoryName" element={<ProductListing />} />
        <Route path="/cart" element={<CartItems />} />
        <Route path="/" element={<ProductListing />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
