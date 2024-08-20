import "./signup.css";
import React, { useState } from "react";
import axios from "axios";
import urlConfig from "../../utils/urlConfig";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";

function Signup() {
  /*************state variables*************/
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async () => {
    // write your logic here
    try {
      setLoading(true);

      let userDetails = {
        name,
        email,
        password,
        confirmPassword,
      };
      console.log(userDetails);

      const resp = await axios.post(urlConfig.SIGNUP_URL, userDetails);
      const data = resp.data;
      console.log(data);

      if (data) {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("User is not registred sucessfully");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-wrapper">
      {loading ? (
        <Spinner
          animation="grow"
          variant="danger"
          style={{ width: "50px", height: "50px" }}
        />
      ) : (
        <div className="s-wrapper-container">
          <div className="form-box signup">
            <form action="">
              <h1>Signup</h1>
              <div className="input-box">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaUser className="signupUser-icon" />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdEmail className="signupUser-icon" />
              </div>

              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaLock className="signupUser-icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  id="password"
                  name="confirmPassword"
                  placeholder="Your ConfirmPassword.."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FaLock className="signupUser-icon" />
              </div>
              <Link to="/login" className="link">
                <span className="goto-login">Already have an account ?</span>
              </Link>
              <button
                className="signup-btn"
                type="submit"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
