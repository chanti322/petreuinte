import React, { useState, useContext } from "react";
import { VariablesContext } from "../../context/VariablesContext";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/SignUpForm.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  useHistory
} from "react-router-dom";
const serverURL = require("../../config.js").serverURL;
const useStyles = makeStyles((theme) => ({
  widthForm: {
    marginTop: 80,
    width: 350,
    margin: "0 auto",
    boxShadow: "1px 1px 4px 10px rgba(120,120,120,0.23)",
    padding:10,
    paddingBottom:20,
    borderRadius:10,

  },
}))
export default function SignIn() {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const {  setUsernameStorage } = useContext(VariablesContext);
  const {userInfo, setUserInfo,  setIsLoggedIn, userId, setUserId } =
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
        localStorage.setItem("userInfo",data.user)
  
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
    <div className={classes.widthForm}>
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
