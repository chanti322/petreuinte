import React, {  useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
const serverURL = require("../../config.js").serverURL;
const LogOut = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
 
    setUserInfo,
 
    setUserId,
  } = useContext(AuthContext);
  const accessToken = localStorage.getItem("accessToken");


  let logoutButton = {
    padding: 5,
    textTransform: "uppercase",
    color: "orange",
    fontWeight: "bold",
    fontSize: 10,

  };
  function logOutFetch() {
    fetch(serverURL + "/users/logout", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoggedIn(false);
        setUserInfo(null);
        setUserId(null);
        localStorage.clear();
      })
      .then(() => {
        setIsLoggedIn(false);
      });
  }

  const reloadAndClean = () => {
    logOutFetch();

 
  };
  console.log("in button", isLoggedIn);
  return (
    <div>
      <Link to="/">
        <button style={logoutButton} onClick={reloadAndClean}>
          LogOut
        </button>
      </Link>
    </div>
  );
};
export default LogOut;
