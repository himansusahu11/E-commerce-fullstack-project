import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageNotFound from "../pages/pageNotFound/PageNotFound";
import ProductListing from "../pages/productListing/ProductListing";
import CartItems from "../pages/cartItems/CartItem";
import Signup from "../pages/signup/Signup";
import Login from "../pages/login/Login";
import useFetchData from "../hooks/useFetchData";
import useAuth from "../context/auth/useAuth";
import LandingPage from "../pages/LandingPage/LandingPage";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer/Footer";
import AboutUs from "../pages/AboutUs/AboutUs";
import ContactUs from "../pages/ContactUs/ContactUs";
import { useContext } from "react";
import { ProductsContext } from "../context/products/ProductsContext";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

import urlConfig from "../utils/urlConfig";
const AppRoutes = () => {
  const { products } = useContext(ProductsContext);

  const {
    data: categories,
    error,
    isLoading,
  } = useFetchData(urlConfig.CATEGORIES_URL, []);
  const { user } = useAuth();
  console.log(user);
  console.log(categories);

  return (
    <Router>
      {user && Object.keys(user).length ? (
        <Navbar categories={categories?.data} isLoading={isLoading} />
      ) : (
        <></>
      )}
      <Routes>
        {user && Object.keys(user).length ? (
          <>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/aboutus" element={<AboutUs />}></Route>
            <Route path="/contactus" element={<ContactUs />}></Route>
            <Route path="/product" element={<ProductListing />}></Route>
            <Route
              path="/products/:categoryName"
              element={<ProductListing />}
            />
            <Route path="/cart" element={<CartItems />} />
            <Route
              path="/products/details/:productId"
              element={<ProductDetails products={products} />}
            />
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
      {user && Object.keys(user).length ? <Footer /> : <></>}
    </Router>
  );
};

export default AppRoutes;
