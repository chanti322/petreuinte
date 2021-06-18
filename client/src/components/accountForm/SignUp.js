import React, { useState, useEffect } from "react";
import validation from "./validation";
import { TextField,Paper } from "@material-ui/core";

export default function SignUp(props) {
  /* const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
  }); */
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const[image,setImage] =useState("")
  const [url,setUrl]= useState("")
  let submitForm =props.submitForm

  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataIsCorrect] = useState(false);

 /*  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }; */

  /*useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect && submitForm!== undefined) submitForm(true);
  }, [errors]); */
  //Add user in MongoDB
  
 /*  useEffect(() => {
   addUser()
 },[p]) */
 /*  useEffect(()=>{
        if(url){
            addUser()
        }
    },[url])
 const uploadPicProfile = ()=>{
        const data = new FormData()
        data.append("file",image)
      data.append("upload_preset", "find-pet");
    data.append("cloud_name", "cloulau");
    fetch("https://api.cloudinary.com/v1_1/cloulau/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    } */
  const addUser = () => {
     if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
          console.log("invalid email")
            return
        }
      fetch("http://localhost:5000/users/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json'",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          
        }),
      })
        .then(res => res.json())
        .then((data) => {
          console.log("data", data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
  const handleFormSubmit = () => {
  //  e.preventDefault();
   // setErrors(validation(values));
    //setDataIsCorrect(true);
    addUser();
  }
  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <h2 className="welcome">Welcome!</h2>
          <h2 className="title">Create an Account</h2>
        </div>
        <div className="form-wrapper">
          <div className="name">
            <label className="label" htmlFor="fullname">
              FullName
            </label>
            <TextField
              className="input"
              type="text"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            {errors.fullname && <p>{errors.fullname}</p>}
          </div>
          <div className="email">
            <label className="label">Email</label>
            <TextField
              className="input"
              type="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className="password">
            <label className="label">Password</label>
            <TextField
              className="input"
              type="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
        {/*      <Paper style={{padding:5, margin:5}}>
        <label forhtml="image">Upload Image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0]) }  />
            </Paper> */}
          <button
            className="submit"
             onClick={addUser}  
          >
            Sign Up
          </button>
        </div>
        <p style={{marginTop:25}}>Do you have an account? Sign in</p>
      </div>
    </div>
  );
}
