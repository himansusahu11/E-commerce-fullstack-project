import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import urlConfig from "../../utils/urlConfig.js";
import axios from "axios";
import useAuth from "../../context/auth/useAuth.js";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";

function Login() {
  // const showToast = () => {
  //   toast.error("This is a test error toast");
  // };

  /////////////////////////////////////////
  /*****data for you backend***/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const handleSubmit = async () => {
    // write your logic here
    try {
      setLoading(true);

      let userDetails = {
        email,
        password,
      };
      console.log(userDetails);

      const resp = await axios.post(urlConfig.LOGIN_URL, userDetails);
      const data = resp.data;
      console.log(resp);
      console.log(data);

      if (resp.status === 200) {
        setEmail("");
        setPassword("");
        navigate("/");
        setAuth(data);
        toast.success("User has been successfully logged in");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("User is not logged in successfully");
    } finally {
      setLoading(false);
    }
  };
  /**
   * email, password -> verified
   * protected Routes : profile , orders , -> need your verification -> JWT
   *
   * **/

  return (
    <div className="login-wrapper">
      {loading ? (
        <Spinner
          animation="grow"
          variant="danger"
          style={{ width: "50px", height: "50px" }}
        />
      ) : (
        <div className="l-wrapper-container">
          <div className="form-box login">
            <form action="">
              <h1>Login</h1>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Useremail"
                  id="lname"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdEmail className="loginUser-icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  id="lname"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaLock className="loginUser-icon" />
              </div>
              <Link to="/signup" className="link">
                <span className="create-acc">Create a new account ?</span>
              </Link>
              <button
                className="login-btn"
                type="submit"
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
