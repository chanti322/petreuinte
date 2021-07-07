import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { VariablesContext } from "../../context/VariablesContext";
const LogOut = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(VariablesContext);
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
    fetch("http://localhost:5000/users/logout", {
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
      .then((data) => console.log(data));
  }
  let changeLogIn = () => {
    setIsLoggedIn(false);
  };
  const reloadAndClean = () => {
    logOutFetch();
    localStorage.clear();
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
