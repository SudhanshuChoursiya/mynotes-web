import "./Dashboard.css";

import React, { useState, useEffect } from "react";

import Spinner from "../Components/Spinner.js";
import { Link} from "react-router-dom";
import Userqueries from "../Components/Queries_table.js";

import Addnotes from "../Components/Addnotes.js";

import Yournotes from "../Components/Yournotes.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(false);

  const [showuserTable, setShowuserTable] = useState(true);

  const [showAddnote, setShowAddnote] = useState(false);
  
  const [showNotes, setShowNotes] = useState(false);


  const loginPopup = localStorage.getItem("popup");

  setTimeout(() => {
    localStorage.removeItem("popup");
  }, 500);

  if (popup === true) {
    toast.success("Login succesfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  useEffect(() => {
    if (loginPopup) {
      setPopup(true);
    }
    setLoading(false);
    window.scrollTo({top:0,left:0,behaviour:'smooth'})
  }, [popup]);

  if (loading) {
    return <Spinner />;
  }

  const showQuery = () => {
   setShowuserTable(true);
    setShowAddnote(false);
    setShowNotes(false);
  };


  const showAddnotes = () => {
    setShowuserTable(false);
    setShowAddnote(true);
    setShowNotes(false);
  };
  
  const shownotes = () => {
    setShowuserTable(false);
    setShowAddnote(false);
    setShowNotes(true);
  };

  return (
    <>
      <div className="dashboard_img_container">
        <h1 className="text-center my-2">admin-dashboard</h1>
      </div>

      <div className="dropdown mx-4 my-4">
        <Link
          className="btn btn-secondary dropdown-toggle"
          to="#"
          role="button"
          id="dropdownMenuLink"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select Details
        </Link>

        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <li className="dropdown-item" onClick={showQuery}>
            User Queries
          </li>


          <li className="dropdown-item" onClick={showAddnotes}>
            Add Notes
          </li>
          
          <li className="dropdown-item" onClick={shownotes}>
            Your Notes
          </li>
        </ul>
      </div>
      {showuserTable ? <Userqueries /> : ""}

      {showAddnote ? <Addnotes/> : ""}
      
      {showNotes? <Yournotes/> : ""}
      <ToastContainer />
    </>
  );
};

export default Dashboard;
