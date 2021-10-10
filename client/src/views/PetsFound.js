import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CardPet from "../components/Card";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import RegisterPet from "../components/RegisterPetButton";

import { VariablesContext } from ".././context/VariablesContext";
const serverURL = require("../config.js").serverURL;
const useStyles = makeStyles((theme) => ({
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
  blockContainer: {
    [theme.breakpoints.up(600)]: {
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
    },
  },
}));

export default function PetsFound() {
  let {
    countInSave,
    setCountInSave,
    removePost,
    setRemovePost,
    heart,
    setHeart,
    userFavoritesArray,
    setUserFavoriteArray,
  } = useContext(VariablesContext);
  const classes = useStyles();
  const loggedIn = localStorage.getItem("loggedIn");
  const userId = localStorage.getItem("userId");
  const { pets, setPets } = useContext(VariablesContext);
  const [userProfile, setUserProfile] = useState([]);
  // const [pets, setPets] = useState([]);
  useEffect(() => {
    fetch(serverURL + "/pets/found")
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        console.log("petfound", data);
      });
  }, [removePost, heart, userFavoritesArray]);

  return (
    <div style={{ marginTop: 80, width: "100vw", textAlign: "center" }}>
      <h2 className={classes.title}>Spotted Pets</h2>
      <p className={classes.description}>
        List of animals spotted on the street by users
      </p>
      <RegisterPet />
      {/*  <div className={classes.registerButtonDiv}>{loggedIn ? <Link to="/Form"><button className={classes.registrButton} >Register a Pet</button></Link>: <p className={classes.logInRequest}>Please Log in to register a pet</p>}</div> */}
      <div className={classes.blockContainer}>
        {pets.map((pet) => {
          return <CardPet pet={pet} />;
        })}
      </div>
    </div>
  );
}
