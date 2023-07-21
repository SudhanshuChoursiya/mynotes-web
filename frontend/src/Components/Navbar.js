import "./Navbar.css";
import logo from "../images/logo.svg";

import React, { useContext,useRef,useState,useEffect} from "react";

import { Link, useNavigate } from "react-router-dom";
import {AppContext} from "../searchContext.js";
const Navbar = () => {
  const [sticky,setSticky]=useState(false);
  
  const {getNotes,setNotes,notFound,setNotFound,query,setQuery}=useContext(AppContext);
  
  const navigate = useNavigate();
  const searchBar=useRef();
  const nav=useRef();
  const userToken = localStorage.getItem("5h&3hdh&$cud@67#hfj");

  const adminToken = localStorage.getItem("f@&uhdjxjd$64$68#hd");

  const logout = () => {
    if (userToken) {
      localStorage.removeItem("5h&3hdh&$cud@67#hfj");
      navigate("/login");
    }

    if (adminToken) {
      localStorage.removeItem("f@&uhdjxjd$64$68#hd");
      navigate("/login");
    }
  };
  
 const ShowSearchBar=()=>{
    searchBar.current.classList.toggle('visiblity-hidden');
    nav.current.classList.toggle('nav-height');
  }

  const NavLinks = () => {
    if (userToken) {
      return (
        <>
          <Link to="/" 
          ><li>HOME</li></Link>
          <Link to="/about"><li>ABOUT</li></Link>
         
          <Link to="/contact"><li>CONTACT US</li></Link>
          
          
          <li onClick={logout}>LOGOUT</li>
        </>
      );
    } else if (adminToken) {
      return (
        <>
                   <Link to="/"><li>HOME</li></Link>
          <Link to="/about"><li>ABOUT</li></Link>
         
          <Link to="/contact"><li>CONTACT US</li></Link>
          
          

          <Link to="/dashboard"><li>DASHBOARD</li></Link>

          <li onClick={logout}>LOGOUT</li>
        </>
      );
    } else {
      return (
        <>
          <Link to="/"><li>HOME</li></Link>
          <Link to="/about"><li>ABOUT</li></Link>
         
          <Link to="/contact"><li>CONTACT US</li></Link>
          

          <Link to="/signup"><li>SIGNUP NOW</li></Link>
          
          <Link to="/login"><li>LOGIN NOW</li></Link>
       
        </>
      );
    }
  };
  
const base_url=process.env.REACT_APP_BASE_URL

const getSearchedNotes=async(e)=>{
  e.preventDefault()
  navigate('/')
  setQuery(e.target.value);
  if(query.length>0){
  const res=await fetch(`${base_url}/search/${query}`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    }
  })
  const data=await res.json();
  if(res.status===200){
  setNotes(data.search)
  }else{
    setNotes([])
  }
}
}


  return (
    <>
      <nav className="navBar" id="nav" ref={nav}>
  
     <div className="sidebarContainer">  
                
 <div className="lefthalf">     
    <div className="logoContainer">
    <img src={logo} alt="logo"/>
    
    <h1>StudyShelf</h1>
    </div>
   </div>        

<div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    
  <div className="offcanvas-header">
     <span className="logoContainer">
    <img src={logo} alt="logo"/>
</span>      
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  
 
  
  <div className="offcanvas-body">
    <div>  
    
    </div>
    <div className="sidebar-item">
     <span className="sidebarLinksContainer">
      <ul>
        <NavLinks/>
      </ul>
      </span>
    </div>
  </div>
</div>

 <div className="righthalf">
 <span className="searchIconContainer" id="search-icon-container"
 onClick={ShowSearchBar}>
   <i className="fa-solid fa-magnifying-glass" id="search_icon"></i>  
 </span>
  
<span className="hamburgerContainer">
    <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
  <i className="fa-solid fa-bars hamburgerIcon"></i>
</button>         
</span>
</div>
</div>
  
 <div className="searchbarMainContainer">
        <div className="searchContainer visiblity-hidden" id="searchbar"
        ref={searchBar}>
    <form className="d-flex align-items-center" onSubmit={(e)=>e.preventDefault()}>
    <input className="input" type="search" name="search" id="search"
    placeholder="Search here" value={query} onChange={getSearchedNotes}/> 
      
    </form>
 </div>
    </div>
   </nav>
    </>
  );
};

export default Navbar;
