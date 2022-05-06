import React, { useState, useContext } from "react";
import { VariablesContext } from "../../context/VariablesContext";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/SignUpForm.css";
import {
  useHistory
} from "react-router-dom";
const serverURL = require("../../config.js").serverURL;
export default function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const {  setUsernameStorage } = useContext(VariablesContext);
  const { setUserInfo,  setIsLoggedIn, setUserId } =
    useContext(AuthContext);

  const accessToken = localStorage.getItem("accessToken");


 

  let getLogIn = () => {
    fetch(serverURL + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("accessToken", data.token);
        if (data.token !== undefined) {
          localStorage.setItem("loggedIn", data.loggedIn);
         setIsLoggedIn(true);
         setUserInfo(data.user);
         setUserId(data.user._id)
   
        }
        localStorage.setItem("usernameStorage", data.user.username);
        setUsernameStorage(data.user.username);
        localStorage.setItem("userAvatar", data.user.pic);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("userFavorites", data.favorites);
  
        history.push("/Form");
        if (accessToken !== undefined) {
      
         setErrorText("");
        }
      })
      .catch((err) => {
        console.log("err", err);
        if (err) {
          setErrorText("password or email are invalid");
        } else {
          setErrorText("");
        }
      });
  };

  const reloadAndFetch = () => {
    getLogIn();
  };

  return (
    <div style={{ width: "90%", margin: "0 auto", marginTop: 80 }}>
      <h3 className="title" style={{ fontSize: 30 }}>
        Welcome Back!
      </h3>
      <p>{errorText}</p>
      <input
        className="input"
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="input"
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        style={{ marginTop: 20 }}
        className="submit"
        onClick={reloadAndFetch}
      >
        SignIn
      </button>
    </div>
  );
}
