import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CardPet from "../components/Card";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { VariablesContext } from ".././context/VariablesContext";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  registerButtonDiv: {
    margin: 15,
    display: "flex",
    justifyContent: "flex-end",
    maxWidth: "80%",
  },
  registrButton: {
    backgroundColor: "green",
    color: "white",
    padding: 5,
    borderRadius: 20,
    justifyContent: "flex-end",
    fontWeight: "bold",
  },
  logInRequest: {
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

export default function RegisterPet() {
  const classes = useStyles();
  const loggedIn = localStorage.getItem("loggedIn");
  //const { pets, setPets } = useContext(VariablesContext);
  // const [pets,setPets] = useState([])

  return (
    <div className={classes.registerButtonDiv}>
      {loggedIn ? (
        <Link to="/Form">
          <button className={classes.registrButton}>Register a Pet</button>
        </Link>
      ) : (
        <p className={classes.logInRequest}>Please Log in to register a pet</p>
      )}
    </div>
  );
}
