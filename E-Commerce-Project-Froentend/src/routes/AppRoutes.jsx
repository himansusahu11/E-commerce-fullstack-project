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
  } = useFetchData("http://localhost:5050/api/product/categories", []);
  const { user } = useAuth();
  console.log(user);
  console.log(categories);

  return (
    <Router>
      {user && Object.keys(user).length ? (
        <Header categories={categories?.data} isLoading={isLoading} />
      ) : (
        <></>
      )}
      <Routes>
        {user && Object.keys(user).length ? (
          <>
            <Route
              path="/products/:categoryName"
              element={<ProductListing />}
            />
            <Route path="/cart" element={<CartItems />} />
            <Route path="/" element={<ProductListing />} />
            <Route path="*" element={<PageNotFound />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
