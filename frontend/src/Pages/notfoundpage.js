import "./Notfoundpage.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Components/Spinner.js";

import sadSvg from "../images/sad.svg"

const Notfoundpage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Error 404";
    setLoading(false);
    window.scrollTo({top:0,left:0,behaviour:'smooth'})
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center notfoundpage">
        <img src={sadSvg} alt="img" />

        <h1 className="text-center">404</h1>
        <h2 className="text-center">Page not found</h2>
        <p>
          The page you are looking for doesn't exist or an another error occured
        </p>
        <span>
          <li className="goback_button" onClick={() => navigate(-1)}>
            Click here to Go Back
          </li>
        </span>
      </div>
    </>
  );
};

export default Notfoundpage;
