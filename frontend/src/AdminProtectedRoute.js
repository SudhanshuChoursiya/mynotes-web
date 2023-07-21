import React,{useEffect} from 'react';

import {useNavigate} from 'react-router-dom';

const AdminProtectedRoute=({Component})=>{
  const navigate=useNavigate();
  

  const adminToken = localStorage.getItem("f@&uhdjxjd$64$68#hd");
  
  
  useEffect(()=>{
  if(!adminToken){
    navigate('/')
  }
  },[])
  
  return(
    <>
    <Component/>
    </>
    )
  
}

export default AdminProtectedRoute;