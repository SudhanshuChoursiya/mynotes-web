import './Aboutpage.css';
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import Spinner from "../Components/Spinner.js";

const Aboutpage = () => {
const [loading, setLoading] = useState(true);

useEffect(()=>{
  setLoading(false)
    window.scrollTo({top:0,left:0,behaviour:'smooth'})
  },[])

if(loading){
  return <Spinner/>
}
  return (
  <>
    <div className="about-us-main-container">
         <div className="page-main-title">
        <h1 className="text-center">About Us</h1>
    </div>
       <div className="paragraph_container">
        <p className="text-center">
          This is a notes website we are providing notes for some relevent subject of engineering and other fields.do checkout your subject notes and start your learning journey and one more thing its totaly free. 
        </p>
        </div> 
        <div className="about_page_btn_container">
            <Link to="/signup"><button>Start your journey</button></Link>
        </div>          
      </div>

  </>
  )
}

export default Aboutpage;