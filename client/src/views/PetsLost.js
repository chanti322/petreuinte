import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardPet from "../components/Card"
import RegisterPet from "../components/RegisterPetButton";

import { VariablesContext } from ".././context/VariablesContext";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  description: {
    fontStyle: "italic",
    textAlign: "center",
    padding:20
  },
  title: {
    backgroundColor: "rgba(255,165,0,0.7)",
    marginBottom: 40,
    color: "white",
    textShadow: "2px 2px 2px rgba(150, 150, 150, 1)",
    padding:5
  }
});

export default function PetsLost() {
  const classes = useStyles();
  let  { countInSave,setCountInSave } = useContext(VariablesContext);
  const [pets, setPets] = useState([])
  const accessToken = localStorage.getItem("accessToken")
  console.log("tokeninLost", accessToken)

  useEffect(() => {
    if (accessToken) {
      fetch("http://localhost:5000/pets/lost", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("accessToken")
        } 
      })
        .then((res) => res.json())
        .then((data) => {
          setPets(data);
          console.log("petlost", pets)
        }).catch(err => {
          console.log(err)
        })
    }else {
      console.log("You have to logIn")
    } 
  }, [countInSave]);
  return (
    <div style={{ marginTop: 80, width:"100vw", textAlign:"center" }}>
      <h2 className={classes.title}>Lost Pets</h2>
      <p className={classes.description}>Animals that have been lost</p>
       <RegisterPet /> 
     
      {pets.length>0 && pets.map((pet) => {

        return (
          <CardPet pet={pet}/>
        
        );
      })}
    </div>
  );
}
