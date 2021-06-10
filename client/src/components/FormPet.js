import React, { useState, useEffect } from "react";
let marginInputGroup = {
  marginTop: 10,
  marginBottom: 15,
  display: "flex",

  flexDirection: "column",
  width: "20%",
  margin: "0 auto",
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
    <div style={{ marginTop: 100 }}>
      <label forhtml="lost">Lost</label>
      <input
        type="radio"
        id="lost"
        name="situation"
        value="lost"
        onChange={(e) => setRadio(e.target.value)}
        required
      />
      <label forhtml="found">Found on the street</label>
      <input
        type="radio"
        id="found"
        name="situation"
        value="found"
        onChange={(e) => setRadio(e.target.value)}
        required
      />
      <div style={marginInputGroup}>
        <label forhtml="name">Pet's name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label forhtml="type">Pet's specie</label>
        <input
          type="text"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <label forhtml="breed">Pet's breed</label>
        <input
          type="text"
          name="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
      </div>
      <label forhtml="color">Color</label>
      <input
        type="text"
        name="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <div style={marginInputGroup}>
        <label forhtml="info">Write further informations</label>
        <textarea
          placeholder="Write further information about the pet and where you lost or saw it"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label forhtml="image">Upload Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <button onClick={() => postDetails()}>Submit</button>
    </div>
  );
}
