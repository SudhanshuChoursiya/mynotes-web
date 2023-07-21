import "./Contactpage.css";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Spinner from "../Components/Spinner.js";

const Contactpage = () => {
  const [loading, setLoading] = useState(true);

  const [input, setInput] = useState({
    name: "",
    email: "",
    mobileNo: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    document.title = "Contact me";
    setLoading(false);
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const setData = (e) => {
    const { name, value } = e.target;

    setInput((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };

  const { name, email, mobileNo, subject, message } = input;

  const base_url = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${base_url}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, mobileNo, subject, message }),
    });

    const data = await response.json();
    if (response.status === 404 || !data) {
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
    } else {
      toast.success("Sucessfull submitted!", {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setInput({
        name: "",
        email: "",
        mobileNo: "",
        subject: "",
        message: "",
      });
    }
  };

  return (
    <>
      <div className="contact-form-main-container">
        <div className="inner-main-container">
          <h1 className="text-center page-main-title">Contact us</h1>
          <div className="got_question_main_container">
            <div>
              <h1>GOT ANY QUESTIONS?</h1>
              <p>
                Please fill out request form below or email me at
                mynotes930@gmail.com
              </p>
            </div>
          </div>

          <form className="row g-3 mx-2">
            <div className="col-md-6 contact_form">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                minLength="3"
                maxLength="25"
                placeholder="Name"
                value={input.name}
                required
                onChange={setData}
              />
            </div>

            <div className="col-md-6 contact_form">
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                name="email"
                placeholder="Email"
                required
                value={input.email}
                onChange={setData}
              />
            </div>

            <div className="col-md-6 contact_form">
              <input
                type="tel"
                className="form-control"
                id="phoneno"
                name="mobileNo"
                minLength="10"
                maxLength="10"
                placeholder="Mobile No."
                required
                value={input.mobileNo}
                onChange={setData}
              />
            </div>

            <div className="col-md-6 contact_form">
              <input
                type="text"
                className="form-control"
                id="phoneno"
                name="subject"
                minLength="10"
                maxLength="50"
                placeholder="Subject"
                required
                value={input.subject}
                onChange={setData}
              />
            </div>

            <div className="form contact_form">
              <textarea
                className="form-control"
                placeholder="Message"
                id="floatingTextarea2"
                style={{ height: "100px" }}
                name="message"
                minLength="10"
                maxLength="130"
                required
                value={input.message}
                onChange={setData}
              ></textarea>
            </div>

            <div className="col-12 contact_form">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                SUBMIT
              </button>
            </div>
          </form>

          <div className="stay_touch_main_container">
            <div className="stay_touch_container">
              <h1>STAY IN TOUCH</h1>
              <p>
                Feel free to contact me directly if you have any inquiries
                regarding services. I would love to have you stay with me!
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Contactpage;
