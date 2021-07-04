import React, { useState, useEffect } from 'react'
import "../../styles/SignUpForm.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
export default function SignIn() {
    const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
 const [errorText,setErrorText]= useState("")
  // console.log({ email: email })
 const accessToken = localStorage.getItem("accessToken")
 // console.log("signInToken", accessToken) 
   const loggedIn = localStorage.getItem("loggedIn")
   const usernameStorage = localStorage.getItem("usernameStorage")

   

  let getLogIn = ()=>{
      fetch("http://localhost:5000/users/login", {
         method: 'POST',
          headers:{
                "Content-Type":"application/json"
            },
           body:JSON.stringify({
                email,
               password
            })
      }).then(res => res.json())
         .then(data => {
          
            console.log("alldata",data)
            console.log("data", data.token);
            console.log("user", data.loggedIn)
           
            localStorage.setItem("accessToken",data.token)
           if(data.token !=undefined){ localStorage.setItem("loggedIn", data.loggedIn)}
            localStorage.setItem("usernameStorage", data.user.username)
            localStorage.setItem("userAvatar", data.user.pic)
            localStorage.setItem("userId", data.user._id)
            console.log(data.user._id)
            console.log(data.token)
            if (accessToken !=undefined){
        setErrorText("")
            } 
         }
           
         ).catch(err => {
            console.log("err", err)
            if (err) {
               setErrorText("password or email are invalid")
            }
           
         })
     
   }
   const reloadAndFetch = () => {
     
      getLogIn()
   }

   return (<div style={{ width:"90%", margin: "0 auto", marginTop: 80 }}>
      <h3 className="title" style={{ fontSize: 30 }}>Welcome Back!</h3>
      <p>{errorText}</p>
       <input
          className="input"
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
       <input
          className="input"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
      />
      <button style={{marginTop:20}}  className="submit"
            onClick={reloadAndFetch}
            >
                SignIn
            </button>
  </div>)  
}