import '../Pages/Dashboard.css';
import React, {useState,useEffect,useRef} from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../Components/Spinner.js";

const Addnotes = () => {
  const [loading,setLoading]=useState(true);
  const [title,setTitle]=useState('');
  const [image,setImage]=useState(null);
  const [file,setFile]=useState(null);
  const [subject,setSubject]=useState('');
  const [Class,setClass]=useState('');
  
  const imageRef=useRef(null);
  const fileRef=useRef(null);
  
  const base_url=process.env.REACT_APP_BASE_URL
  
  
  const handleSubmit=async(e)=>{
    e.preventDefault()

if(!title || !image || !file || !subject || !Class){
toast.error("Please fill all the fields", {
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

  const formData=new FormData();
  formData.append('title',title);
  formData.append('image',image);
  formData.append('notesfile',file);
  formData.append('subject',subject);
  formData.append('className',Class);
  
  const response=await fetch(`${base_url}/upload-notes`,{
    method:'POST',
    body:formData
  })
  const data = await response.json();

if(response.status===400 || !data){
toast.error("Invalid file type please check", {
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
toast.success("Notes added successfully", {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      
      setTitle('');
      setSubject('');
      setClass('');
      imageRef.current.value=null;
      fileRef.current.value=null;
      
  }
  
  }
  
  useEffect(()=>{
    setLoading(false);
  },[])
  
  if(loading){
    return <Spinner/>
  }
  
  return (
  <>
       <form>
          
           <div className="col-md-6 upload_form upload_form_extras">
               <label htmlFor="title">Notes Title</label>
               
    <input type="text" className="form-control" id="phoneno" name="title"
    minLength="2" required onChange={(e)=>setTitle(e.target.value)} value={title}/>
  </div>
  
   <div className="col-md-6 upload_form upload_form_extras">  
       
       <label htmlFor="image">Notes Image</label>
    <input type="file" className="form-control" id="phoneno" name="image" required onChange={(e)=>setImage(e.target.files[0])} ref={imageRef}/>
  </div>
  
  <div className="col-md-6 upload_form upload_form_extras">  
      
      <label htmlFor="notesfile">Notes File</label>
    <input type="file" className="form-control" id="phoneno" name="notesfile"
    required onChange={(e)=>setFile(e.target.files[0])} ref={fileRef}/>
  </div>
  
    <div className="col-md-6 upload_form upload_form_extras">
        
        <label htmlFor="subject">Subject</label>
    <input type="text" className="form-control" id="phoneno" name="subject"
    required onChange={(e)=>setSubject(e.target.value)} value={subject}/>
  </div>
  
    
    <div className="col-md-6 upload_form upload_form_extras">
        
        <label htmlFor="className">className</label>        
    <input type="text" className="form-control" id="phoneno" name="className" required onChange={(e)=>setClass(e.target.value)} value={Class}/>
  </div>
 
  
  <div className="col-12 upload_form">
    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>UPLOAD</button>
  </div>
           
       </form>
  <ToastContainer/>
  </>
  )
}

export default Addnotes;