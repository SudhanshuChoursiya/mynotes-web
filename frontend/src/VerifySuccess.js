import React,{useEffect} from 'react';

import {useNavigate} from 'react-router-dom';


const VerifySuccess = ({Component}) => {
  const nevigate=useNavigate();


  useEffect(()=>{
const verify=localStorage.getItem('email_verify');
  if(verify!=='success'){
    nevigate('/')
  }
  },[])

  return (
    <>
  <Component/>
  </>
  )
}

export default VerifySuccess;