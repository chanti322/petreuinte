import React from "react";
import "../../styles/SignUpForm.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function SignUpSuccess() {
  return (
   
      <div >
        <h1 className="form-success">Account Created!</h1>
        <Link to="/"><p style={{marginTop:20}}>Back to Home Page</p></Link>
      </div>
   
  );
}
