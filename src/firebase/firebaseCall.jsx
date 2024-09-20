import React from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReactNotificationComponent = ({ title, body }) => {
  

  toast.info(<Display />);
 

  function Display() {
    return (
      <div>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    );
  }

  return (
  <div className="container h-100">
            
  <ToastContainer
      position="top-right"
      autoClose={15000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
  />
  <ToastContainer />
</div>
  );
};


export default ReactNotificationComponent;
