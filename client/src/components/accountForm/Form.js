import React, { useState } from "react";
import SignUp from "./SignUp";
import SignUpSuccess from "./SignUpSuccess";

export default function Form() {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const submitForm = () => {
    setFormIsSubmitted(true);
  };
  return (
    <div>
      {!formIsSubmitted ? (
        <SignUp submitForm={()=>submitForm} />
      ) : (
        <SignUpSuccess />
      )}
    </div>
  );
}
