import React , {useEffect} from 'react';

import {useNavigate} from 'react-router-dom';

const ProtectedRoute=({Component})=>{
  const navigate=useNavigate();
  
const userToken = localStorage.getItem("5h&3hdh&$cud@67#hfj");

  const adminToken = localStorage.getItem("f@&uhdjxjd$64$68#hd");
  
  
  useEffect(()=>{
  if(userToken || adminToken){
    navigate('/')
  }
  },[])
  
  return(
    <>
    <Component/>
    </>
    )
  
}

export default ProtectedRoute;