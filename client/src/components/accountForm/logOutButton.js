import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { VariablesContext } from "../../context/VariablesContext";
import { AuthContext } from "../../context/AuthContext";
const serverURL = require("../../config.js").serverURL;
const LogOut = () => {
  const { isLoggedIn, setIsLoggedIn, userInfo, setUserInfo, userId, setUserId } =
    useContext(AuthContext);
  const accessToken = localStorage.getItem("accessToken");
  console.log("tok logout", accessToken);
  console.log(isLoggedIn);

  let logoutButton = {
    padding: 5,
    textTransform: "uppercase",
    color: "orange",
    fontWeight: "bold",
    fontSize: 10,
    marginRight: 30,
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
        console.log(data);
        setIsLoggedIn(false);
        setUserInfo(null);
        setUserId(null)
        localStorage.clear();
      });
  }
  let changeLogIn = () => {
    setIsLoggedIn(false);
  };
  const reloadAndClean = () => {
    logOutFetch();

    changeLogIn();
  };
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
