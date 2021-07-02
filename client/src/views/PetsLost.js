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
    textAlign:"center"
  },
  title: {
    backgroundColor: "rgba(255,165,0,0.7)",
    marginBottom: 20,
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
    <div style={{ marginTop: 80 }}>
      <h2 className={classes.title}>Lost Pets</h2>
      <p className={classes.description}>Animals that have been lost</p>
      <RegisterPet />
      <p></p>
      {pets.length>0 && pets.map((pet) => {

        return (
          <CardPet pet={pet}/>
         /*  <Card className={classes.root} key={pet._id}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={pet.img}
                title="Contemplative Reptile"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {pet.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {pet.breed} - {pet.type} -{pet._id}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {pet.info} 
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share T
              </Button>
              <Button size="small" color="primary">
          <Link to={`details/${pet._id}`}>

                  Learn More
                    </Link>
              </Button>
            </CardActions>
            </Card>
           */
        );
      })}
    </div>
  );
}
