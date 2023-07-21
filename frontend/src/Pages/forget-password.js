import "./forget-password.css";
import React, { useState, useEffect} from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Components/Spinner.js";

const ForgetPasswordPage = () => {
  const [loading, setLoading] = useState(true);


  const [email, setEmail] = useState('');

  useEffect(() => {
    document.title = "Forget-password";
    setLoading(false);
    window.scrollTo({top:0,left:0,behaviour:'smooth'})
  }, []);

  

const base_url=process.env.REACT_APP_BASE_URL

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res=await fetch(`${base_url}/send-reset-password-link`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email})
    })
    const data=await res.json()
    
    if(res.status===500 || !data){
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
    }else{
      setEmail('')
toast.success("Reset link sent on your email!", {
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
      <div className="container forgetcontainer">
        <form>
          <div className="modal-dialog shadow-sm w-100">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Enter your Email</h5>
              </div>
              <div className="modal-body">
                <div className="col-lg-12 forget_form">

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    minLength="2"
                    maxLength="25"
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Send
                </button>
                    
                </div>


                </div>
              </div>
             
           
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgetPasswordPage;
