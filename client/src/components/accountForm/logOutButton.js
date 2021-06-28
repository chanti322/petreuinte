import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const LogOut = () => {
    const accessToken = localStorage.getItem("accessToken")
    console.log("tok logout", accessToken)
    
    let logoutButton = {
        padding: 5,
        textTransform: "uppercase",
        color: "#FF4500",
        fontWeight: "bold",
        fontSize: 10,
        marginRight: 30,
    }
    function logOutFetch() {

        
        fetch("http://localhost:5000/users/logout", {
            method:"POST",
             headers:{
                 "Authorization": 'Bearer '+ accessToken,
                   "Content-Type":"application/json"
            },  body:JSON.stringify({
                accessToken
            })
        }).then(res => res.json())
            .then(data => console.log(data))
    }
    const reloadAndClean = () => {
        logOutFetch()
        localStorage.clear()
    }
     return ( <div><Link to="/">
        <button style={logoutButton} onClick={reloadAndClean}>LogOut</button></Link>
    </div>)
}
export default LogOut;