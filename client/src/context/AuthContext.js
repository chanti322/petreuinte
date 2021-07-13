import React, { useState, createContext, useEffect } from "react";
const serverURL = require("../config.js").serverURL;
let userId = localStorage.getItem("userId");
let token = localStorage.getItem("accessToken");

const initAuthContextVariables = {
  userInfo: null,
  isLoggedIn: false,
};

export const AuthContext = createContext(initAuthContextVariables);

export const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(initAuthContextVariables.user);
  const [isLoggedIn, setIsLoggedIn] = useState(
    initAuthContextVariables.isLoggedIn
  );

  useEffect(() => {
    let userInfoFetch = () => {
      if (token) {
        fetch(`${serverURL}/users/userProfile/${userId}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log("user in context", data);
            setUserInfo(data);
            setIsLoggedIn(true);
          });
      } else {
        userInfo(null);
      }
    };
    userInfoFetch();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
