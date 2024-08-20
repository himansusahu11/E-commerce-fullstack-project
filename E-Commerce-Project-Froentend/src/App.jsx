import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/auth/AuthProvider";
import CartProvider from "./context/cart/CartProvider";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
          <ToastContainer position="top-right" autoClose={5000} />
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
