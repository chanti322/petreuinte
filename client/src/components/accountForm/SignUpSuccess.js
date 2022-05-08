import React from "react";
import "../../styles/SignUpForm.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function SignUpSuccess() {
  return (
   
      <div >
        <h1 className="form-success">Account Created!</h1>
        <Link to="/signInForm"><p style={{textAlign:"center",marginTop:20}}>Please Log in</p></Link>
      </div>
   
  );
}
