import "./reset-password.css";
import React, { useState, useEffect} from "react";
import { Link,useParams} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Components/Spinner.js";

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(true);
  
const { token } = useParams();


  const [input, setInput] = useState({
    password:'',
    cpassword:''
  });

  useEffect(() => {
    document.title = "Reset-password";
    setLoading(false);
    window.scrollTo({top:0,left:0,behaviour:'smooth'})
  }, []);
  
  const getValue=(e)=>{
    const{name,value}=e.target
    
    setInput((preVal)=>{
      return {
        ...preVal,
      [name]:value
      }
    })
  }
  

  const {password,cpassword}=input

const base_url=process.env.REACT_APP_BASE_URL

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res=await fetch(`${base_url}/forget-password/${token}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({password,cpassword})
    })
    const data=await res.json()
    if(res.status!==200 || !data){
toast.error("password and confirm password not matched", {
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
      setInput({
        password:'',
        cpassword:''
      })
      
toast.success("Password Changed Successfully!", {
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
      <div className="container resetcontainer">
        <form>
          <div className="modal-dialog shadow-sm w-100">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Password Reset</h5>
              </div>
              <div className="modal-body">
                <div className="col-lg-12 reset_form">
                  <label htmlFor="password">New Password</label>
                  
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    minLength="2"
                    maxLength="25"
                    required
                    value={input.password}
                    onChange={getValue}
                    />
                    
                    <label htmlFor="cpassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="cpassword"
                    minLength="2"
                    maxLength="25"
                    required
                    value={input.cpassword}
                    onChange={getValue}
                    />
                   
                   <div className="modal-footer">
                    <Link to='/login' className='goToLogin'>Go to login </Link>
                   
                    
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                    </div>
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

export default ResetPasswordPage;
