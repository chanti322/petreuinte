import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CardPet from "../components/Card"
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
});

export default function PetsFound() {
  const classes = useStyles();
  //const { pets, setPets } = useContext(VariablesContext);
  const [pets,setPets] = useState([])
  useEffect(() => {
    fetch("http://localhost:5000/pets/found")
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
      console.log("petfound",pets)});
  }, []);
  return (
    <div style={{marginTop:80}}>
      <h2 style={{marginBottom:20}}>Animals spotted on the street</h2>
   
      {pets.map((pet) => {
        return (
          <CardPet pet={pet}/>
       
        );
      })}
    </div> 
  );
}
