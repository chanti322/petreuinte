import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { VariablesContext } from "../context/VariablesContext";
import {AuthContext} from "../context/AuthContext"
import Map from "./googleMaps/GoogleMap";
import { Paper, TextField, TextareaAutosize } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import ConvertedAddress from "./ConvertedAddress";
const serverURL = require("../config.js").serverURL;

//Style
let marginInputGroup = {
  //marginTop: 10,
  marginBottom: 15,
  display: "flex",

  flexDirection: "column",
  width: "80%",
  margin: "0 auto",
};

const Paperstyle = {
  padding: 10,
};
let alertPopup = {
  position: " absolute",
  bottom: -400,
  width: 300,
  height: 300,
  display: "flex",
  textAlign: "center",
  alignContent: "flex-start",
  justifyContent: "center",
  alignItems: "center",
};

export default function FormPet() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState("");
  const [color, setColor] = useState("");
  const [radio, setRadio] = useState("");
  const [inSave] = useState(false);


  const [comment] = useState([]);
  const [favorite] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [urlError] = useState("");
  const {  userId} =
  useContext(AuthContext);
 // let userId = localStorage.getItem("userId");

  const { markers } = useContext(VariablesContext);



  //Update image

  useEffect(() => {
    if (url) {
      fetch(serverURL + "/pets/uploads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          radio,
          name,
          type,
          breed,
          color,
          markers,
          info,
          img: url,
          comment,
          inSave,
          userId,
          favorite,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
 
          if (data.error == undefined) {
            setError(false);
            setErrorMessage("");
          } else {
            setError(true);
            setErrorMessage(data.error);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "find-pet");
    data.append("cloud_name", "cloulau");
    fetch("https://api.cloudinary.com/v1_1/cloulau/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {


        setUrl(data.url);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };


  let postSubmitted = () => {
    setSubmitted(true);
  };
  let saveTheForm = () => {
    postDetails();
    postSubmitted();
  };
  return (
    <div style={{ marginTop: 80, marginBottom: "10vh" }}>
      <Paper style={Paperstyle}>
        <h2>Please fill all the information about the pet:</h2>
        <label forhtml="lost">Lost</label>
        <input
          type="radio"
          id="lost"
          name="situation"
          value="lost"
          checked={radio === "lost" && true}
          onChange={(e) => setRadio(e.target.value)}
          required
          style={{ margin: 10 }}
        />
        <label forhtml="found">Found on the street</label>
        <input
          type="radio"
          id="found"
          name="situation"
          value="found"
          checked={radio === "found" && true}
          onChange={(e) => setRadio(e.target.value)}
          required
          style={{ margin: 10 }}
        />
        <div style={marginInputGroup}>
          <label forhtml="name">Pet's name</label>
          <TextField
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label forhtml="type">Pet's specie</label>
          <TextField
            type="text"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <label forhtml="breed">Pet's breed</label>
          <TextField
            type="text"
            name="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />

          <label forhtml="color">Color</label>
          <TextField
            type="text"
            name="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        {/*  <p style={{ margin: 5 }}>Register your location:<Link to="/googleMap">Google Map</Link></p>
      {markers && <p>location selected</p>} */}

        <div style={marginInputGroup}>
          <label forhtml="info">Write further informations</label>
          <TextareaAutosize
            style={{ padding: 3 }}
            rowsMin={4}
            placeholder="Write further information about the pet and where you lost or saw it"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </div>

        <div>
          <Paper style={{ padding: 5, margin: 5 }}>
            <label forhtml="image">Upload Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Paper>
        </div>
        <p>Register the location where you lost or found the pet</p>
        <p>If Google Map is not available write the location in the info box</p>
        <Map />

        <button
          style={{ padding: 3, marginTop: 20 }}
          onClick={() => saveTheForm()}
        >
          Submit
        </button>
      </Paper>
      {submitted && !error && url !== undefined ? (
        <Alert
          severity="info"
          style={{
            position: " absolute",
            bottom: -400,
            width: 300,
            height: 300,
            display: "flex",
            textAlign: "center",
            alignContent: "flex-start",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <p>Post added with success!</p>
          <Link to="/">Back to home page</Link>
        </Alert>
      ) : (
        <Alert>
          <p>{errorMessage}</p>
        </Alert>
      )}
    </div>
  );
}

/* const { name,
        setName,
        type,
        setType,
        breed,
        setBreed,
        url,
        setUrl,
        info,
        setInfo,
        image,
        setImage,
        color,
        setColor,
        radio,
        setRadio, markers, setMarkers, } = useContext(VariablesContext);*/
