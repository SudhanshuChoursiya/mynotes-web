import "./login.css";
import React, { useState, useEffect, useRef} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Components/Spinner.js";

const Loginpage = () => {
  const [loading, setLoading] = useState(true);
  
  const usernameField = useRef();
  const passwordField = useRef();
  const eyeicon = useRef();
  const navigate = useNavigate();

  const [loginValue, setloginValue] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Login";
    setLoading(false);
    
  }, []);

  const getValue = (e) => {
    const { name, value } = e.target;
    setloginValue((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

const base_url=process.env.REACT_APP_BASE_URL

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { username, password } = loginValue;
    const response = await fetch(`${base_url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    
    if (response.status === 400 || !data) {
      toast.error(data.msg, {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (data.user.is_admin === 1) {
      localStorage.setItem("f@&uhdjxjd$64$68#hd", data.token);
      localStorage.setItem("popup", "success");
      navigate("/dashboard");
    } else {
      localStorage.setItem("5h&3hdh&$cud@67#hfj", data.token);
      localStorage.setItem("popup", "success");
      navigate("/");
    }
  };

  const visibleFieldvalue = () => {
    if (passwordField.current.type === "password") {
      passwordField.current.type = "text";
      passwordField.current.focus();
      eyeicon.current.classList.replace("fa-eye", "fa-eye-slash");
    } else if (passwordField.current.type === "text") {
      passwordField.current.type = "password";
      passwordField.current.focus();
      eyeicon.current.classList.replace("fa-eye-slash", "fa-eye");
    }
  };

 
  
  


  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="logincontainer">
        <form>
          <div className="modal-dialog shadow-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login To Continue</h5>
              </div>
              <div className="modal-body">
                <div className="col-lg-12 login_form">
                  <label htmlFor="username" className="form-label my-1">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    minLength="2"
                    maxLength="25"
                    required
                    value={loginValue.username}
                    onChange={getValue}
                    ref={usernameField}
                  />
                </div>

                <div className="col-lg-12 login_form">
                  <label htmlFor="password" className="form-label my-1">
                    Password
                  </label>
                  <div className="input_password_container">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      minLength="7"
                      maxLength="25"
                      id="password_input"
                      required
                      value={loginValue.password}
                      onChange={getValue}
                      ref={passwordField}
                    />
                    <span
                      className="icon_container"
                      onClick={visibleFieldvalue}
                    >
                      <i
                        className="fa-regular fa-eye"
                        id="eye_icon"
                        ref={eyeicon}
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="modal-footer login_form">
                <Link to="/forget-password" className="mx-3">
                  Forget password?
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Login
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

export default Loginpage;
