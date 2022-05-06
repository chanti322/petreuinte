import React, { useState, createContext, useEffect } from "react";
const serverURL = require("../config.js").serverURL;
//let userId = localStorage.getItem("userId");
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

  useEffect(() => {
    let userInfoFetch = () => {
      if (token !== null) {
        console.log("token exists", userInfo);
        console.log(token)
        fetch(`${serverURL}/users/userProfile/${userId}`)
          .then((res) => res.json())
          .then((data) => {
            console.log("user in context", data);
            setUserInfo(data);
          });
      } else {
        setIsLoggedIn(false);
      }
    };
    userInfoFetch();
  }, []);
  console.log("auth context", isLoggedIn);
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
