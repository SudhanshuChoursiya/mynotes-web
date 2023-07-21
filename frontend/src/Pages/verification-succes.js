import "./verification-success.css";
import { useEffect, useState } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import Spinner from "../Components/Spinner.js";

import Thumbsupsvg from "../images/thumbsup.svg"
const VerificationSuccessPage = () => {
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
const [searchParams]=useSearchParams();
 const isVerify=searchParams.get("isVerify");

if(isVerify==="success"){
  localStorage.setItem('email_verify','success')
}


  useEffect(() => {
    document.title = "Verification-success";
    setLoading(false);
    window.scrollTo({top:0,left:0,behaviour:'smooth'})
  }, []);

  if (loading) {
    return <Spinner />;
  }
  
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center Verification-success-page">
        <img src={Thumbsupsvg} alt="img" />

        <h1 className="text-center">Success</h1>
        <h2 className="text-center">Your Email is Verified</h2>

        <span>
          <button className="gotologin_button" onClick={() => navigate('/login')}>
            go to login
          </button>
        </span>
      </div>
    </>
  );
};

export default VerificationSuccessPage;
