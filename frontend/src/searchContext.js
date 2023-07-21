import {useState,useEffect,createContext} from "react";

const AppContext=createContext();


const AppProvider=({children})=>{
 const [query,setQuery]=useState('');
const [searchedQuery]=useState(query);
const [notes,setNotes]=useState([]);
const [page,setPage]=useState(1);
const [total,setTotal]=useState(0);
const [loading,setLoading]=useState(true);

const [notFound,setNotFound]=useState(false);

const base_url=process.env.REACT_APP_BASE_URL

const getNotes=async()=>{
  setLoading(true)
   try{
    const response=await fetch(`${base_url}/notes?page=${page}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    })
    
    const data=await response.json();

    if(response.status===200){
      setNotes(data.notesData)
      setTotal(data.Total)
    }
    }catch(err){
      throw new Error('An unexpected error occured'); 
   }
    setLoading(false)
  }
  

  return (
 <AppContext.Provider value={{getNotes,notes,setNotes,notFound,setNotFound,query,setQuery,searchedQuery,page,setPage,total,setTotal,loading,setLoading}}>
  {children}
 </AppContext.Provider>
  )
}

export {AppContext,AppProvider}
