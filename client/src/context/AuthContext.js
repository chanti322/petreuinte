import React, { useState, createContext, useEffect } from "react";
const serverURL = require("../config.js").serverURL;
let userIdStorage = localStorage.getItem("userId");
let token = localStorage.getItem("accessToken");

const initAuthContextVariables = {
  userInfo: {},
  isLoggedIn: false,
  userId: "",
};

export const AuthContext = createContext(initAuthContextVariables);

export const AuthContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(initAuthContextVariables.userInfo);
  const [isLoggedIn, setIsLoggedIn] = useState(
    initAuthContextVariables.isLoggedIn
  );
  const [userId, setUserId] = useState(initAuthContextVariables.userId);
  console.log("token out", token)
  console.log("info",userInfo._id)

  useEffect(() => {
    let userInfoFetch = () => {
      if (token !== null) {
    console.log("token", token)
    console.log("user",userId)
        fetch(`${serverURL}/users/userProfile/${userIdStorage}`)
          .then((res) => res.json())
          .then((data) => {
        
            setUserInfo(data);
          });
      } else {
        setIsLoggedIn(false);
        console.log("token no", token)
      }
    };
    userInfoFetch();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        userId,
        setUserId,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
