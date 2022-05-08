import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CardPet from "../components/Card";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import RegisterPet from "../components/RegisterPetButton";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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

export default function InSavePet() {
  const classes = useStyles();
 
  const {
    heart,
   
    removePost,
  
    userFavoritesArray,
   
  } = useContext(VariablesContext);
  const [pets, setPets] = useState([]);
  useEffect(() => {
    fetch(serverURL + "/pets/inSave")
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
       
      });
  }, [heart, removePost, userFavoritesArray]);

  return (
    <div style={{ marginTop: 80, width: "100vw", textAlign: "center" }}>
      <h2 className={classes.title}> Pets back at home</h2>
      <p className={classes.description}>
        List of animals that are in safe at home again
      </p>
      <RegisterPet />
      <div className={classes.blockContainer}>
        {pets.map((pet) => {
          return <CardPet pet={pet} />;
        })}
      </div>
    </div>
  );
}
