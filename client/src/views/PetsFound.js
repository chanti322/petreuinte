import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CardPet from "../components/Card";
import { makeStyles } from "@material-ui/core/styles";
import RegisterPet from "../components/RegisterPetButton";

import { VariablesContext } from ".././context/VariablesContext";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },

  description: {
    fontStyle: "italic",
    textAlign: "center",
  },
  title: {
    backgroundColor: "rgba(255,165,0,0.7)",
    marginBottom: 20,
    color: "white",
    textShadow: "2px 2px 2px rgba(150, 150, 150, 1)",
    padding: 5,
  },
});

export default function PetsFound() {
  let { countInSave, setCountInSave } = useContext(VariablesContext);
  const classes = useStyles();
  const loggedIn = localStorage.getItem("loggedIn");
  const userId = localStorage.getItem("userId");
  //const { pets, setPets } = useContext(VariablesContext);
  const [userProfile, setUserProfile] = useState([]);
  const [pets, setPets] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/pets/found")
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        console.log("petfound", pets);
      });
  }, [countInSave]);
  useEffect(() => {
    // if (accessToken) {
    fetch(`http://localhost:5000/users/userProfile/${userId}`, {
      /*   headers: {
          "Authorization": "Bearer " + localStorage.getItem("accessToken")
        }  */
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserProfile(data);
        console.log("postinFound", data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    /*   }else {
      console.log("You have to logIn")
    }  */
  }, []);
  return (
    <div style={{ marginTop: 80, width: "100vw", textAlign: "center" }}>
      <h2 className={classes.title}>Spotted Pets</h2>
      <p className={classes.description}>
        List of animals spotted on the street by users
      </p>
      <RegisterPet />
      {/*  <div className={classes.registerButtonDiv}>{loggedIn ? <Link to="/Form"><button className={classes.registrButton} >Register a Pet</button></Link>: <p className={classes.logInRequest}>Please Log in to register a pet</p>}</div> */}

      {pets.map((pet) => {
        return <CardPet pet={pet} />;
      })}
    </div>
  );
}
