import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const LogOut = () => {
    const accessToken = localStorage.getItem("accessToken")
    console.log("tok logout", accessToken)
    function logOutFetch() {
        fetch("http://localhost:5000/users/logout", {
            method:"POST",
             headers:{
                 "Authorization": 'Bearer '+ accessToken,
                   "Content-Type":"application/json"
            },  body:JSON.stringify({
               blacklistArray: accessToken
            })
        }).then(res => res.json())
            .then(data => console.log(data))
    }
    const reloadAndClean = () => {
        logOutFetch()
        localStorage.clear()
    }
     return ( <div><Link to="/">
        <button onClick={reloadAndClean}>LogOut</button></Link>
    </div>)
}
export default LogOut;