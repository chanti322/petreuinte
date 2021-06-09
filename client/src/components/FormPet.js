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
  //Update image
  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/pets/uploads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          type,
          breed,
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
  });

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
      <div style={marginInputGroup}>
        <label htmlFor="name">Pet's name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="type">Pet's specie</label>
        <input
          type="text"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <label htmlFor="breed">Pet's breed</label>
        <input
          type="text"
          name="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="image">Upload Image</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      <button onClick={() => postDetails()}>Submit</button>
    </div>
  );
}
