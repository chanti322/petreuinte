import React, { useState, useEffect } from "react";
import validation from "./validation";
import { TextField } from "@material-ui/core";

export default function SignUp(props) {
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  let submitForm =props.submitForm
  console.log("submit", submitForm)
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrors(validation(values));
    setDataIsCorrect(true);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) submitForm(true);
  }, [errors]);
  //Add user in MongoDB
  useEffect(() => {

      fetch("http://localhost:5000/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded'",
        },
        body: JSON.stringify({
        values
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
        })
        .catch((err) => {
          console.log(err);
        });
    
  }, [values]);

  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <h2 className="welcome">Welcome!</h2>
          <h2 className="title">Create an Account</h2>
        </div>
        <form className="form-wrapper">
          <div className="name">
            <label className="label" htmlFor="fullname">
              FullName
            </label>
            <TextField
              className="input"
              type="text"
              name="fullname"
              value={values.fullname}
              onChange={handleChange}
            />
            {errors.fullname && <p>{errors.fullname}</p>}
          </div>
          <div className="email">
            <label className="label">Email</label>
            <TextField
              className="input"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className="password">
            <label className="label">Password</label>
            <TextField
              className="input"
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <button
            className="submit"
            onClick={(e) => {
              handleFormSubmit(e);
            }}
          >
            Sign Up
          </button>
        </form>
        <p style={{marginTop:25}}>Do you have an account? Sign in</p>
      </div>
    </div>
  );
}
