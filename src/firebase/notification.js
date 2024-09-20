import React, { useState, useEffect } from "react";
import { getToken } from "./firebaseinit";

const Notifications = (props) => {
  const [isTokenFound, setTokenFound] = useState(false);

  // console.log("Token found", isTokenFound);

  // To load once
  useEffect(() => {


    async function tokenFunc() {
      const data = localStorage.getItem('Fcm')
      if (data) {
          console.log("Token is", data);
      }
      return data;
    }

    tokenFunc();
  }, []);

  return <></>;
};

Notifications.propTypes = {};

export default Notifications;
