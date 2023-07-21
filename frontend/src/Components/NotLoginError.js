import "../Pages/home.css";
import React from "react";
import {Link} from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";


const NotLoginBox = ({show, setShow}) => {
  

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <Modal.Header closeButton onClick={() => setShow(false)}>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body> Please Login to Continue</Modal.Body>
        <Modal.Footer>
          <Link to="/signup"><Button variant="primary">
            Signup
          </Button></Link>

         <Link to="/login"><Button variant="danger">
            Login
          </Button></Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NotLoginBox;
