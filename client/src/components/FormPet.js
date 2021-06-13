import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { VariablesContext } from "../context/VariablesContext";
import { Paper, TextField, TextareaAutosize } from '@material-ui/core';
let marginInputGroup = {
  //marginTop: 10,
  marginBottom: 15,
  display: "flex",

  flexDirection: "column",
  width: "80%",
  margin: "0 auto",
};
//Style
  const Paperstyle = {
    padding:10,
  }
export default function FormPet() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [breed, setBreed] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState("");
  const [color, setColor] = useState("");
  const [radio, setRadio] = useState("");
  const { markers, setMarkers } = useContext(VariablesContext);

  //Update image
  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/pets/uploads", {
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
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
        })
        .catch((err) => {
          console.log(err);
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
        console.log(data.url);
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ marginTop: 80 }}>
      <Paper style={Paperstyle}>
        <h2>Please fill all the information about the pet:</h2>
      <label forhtml="lost">Lost</label>
      <input
        type="radio"
        id="lost"
        name="situation"
        value="lost"
        onChange={(e) => setRadio(e.target.value)}
          required
          style={{margin:10}}
      />
      <label forhtml="found">Found on the street</label>
      <input
        type="radio"
        id="found"
        name="situation"
        value="found"
        onChange={(e) => setRadio(e.target.value)}
          required
          style={{margin:10}}
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
      <p style={{margin:5}}>Register your location:<Link to="/googleMap">Google Map</Link></p>
      <div style={marginInputGroup}>
        <label forhtml="info">Write further informations</label>
          <TextareaAutosize
            style={{padding:3}}
            rowsMin={4}
          placeholder="Write further information about the pet and where you lost or saw it"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        />
      </div>

        <div>
          <Paper style={{padding:5, margin:5}}>
        <label forhtml="image">Upload Image</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </Paper>
      </div>
        <button style={{padding:3}} onClick={() => postDetails()}>Submit</button>
        </Paper>
    </div>
  );
}
