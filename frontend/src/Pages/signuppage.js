import "./signup.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Components/Spinner.js";

const Signuppage = () => {
  const [loading, setLoading] = useState(true);

  const [sigupData, setsignupData] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  useEffect(() => {
    document.title = "Sign-up";
    setLoading(false);
    window.scrollTo({top:0,left:0,behaviour:'smooth'})
  }, []);

  const getValue = (e) => {
    const { name, value } = e.target;
    setsignupData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

   const base_url=process.env.REACT_APP_BASE_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, cpassword } = sigupData;
    if (username && email && password && cpassword !== "") {
      if (password === cpassword) {
        const response = await fetch(`${base_url}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password, cpassword }),
        });
        const data = await response.json();
    
        if (response.status === 404 && data.usernameEmail) {
          toast.error("Username and email already exists!", {
            position: "top-center",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (response.status === 404 && data.username) {
          toast.error("Username already exists!", {
            position: "top-center",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (response.status === 404 && data.email) {
          toast.error("Email already exists!", {
            position: "top-center",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.success("Registration sucessfull! Verification email sent,please verify email", {
            position: "top-center",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setsignupData({
            username: "",
            email: "",
            password: "",
            cpassword: "",
          });
        }
      } else {
        toast.error("Password and confirm password not matched!", {
          position: "top-center",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error("Error fill all the field!", {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="signupcontainer">
        <form>
          <div className="modal-dialog shadow-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Signup To Continue</h5>
              </div>
              <div className="modal-body">
                <div className="col-lg-12 signup_form">
                  <label htmlFor="username" className="form-label my-1">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    minLength="4"
                    maxLength="12"
                    required
                    value={sigupData.username}
                    onChange={getValue}
                  />
                </div>

                <div className="col-lg-12 signup_form">
                  <label htmlFor="email" className="form-label my-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={sigupData.email}
                    onChange={getValue}
                  />
                </div>

                <div className="col-lg-12 signup_form">
                  <label htmlFor="password" className="form-label my-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    minLength="7"
                    maxLength="15"
                    required
                    value={sigupData.password}
                    onChange={getValue}
                  />
                </div>

                <div className="col-lg-12 signup_form">
                  <label htmlFor="cpassword" className="form-label my-1">
                    Confirm-Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="cpassword"
                    minLength="7"
                    maxLength="15"
                    required
                    value={sigupData.cpassword}
                    onChange={getValue}
                  />
                </div>
              </div>
              <div className="modal-footer signup_form">
                <Link to="/login" className="mx-3">
                  Go to Login
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Signup
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signuppage;
