import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CardPet from "../components/Card"
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

export default function PetsLost() {
  const classes = useStyles();
  //const { pets, setPets } = useContext(VariablesContext);
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
  }, []);
  return (
    <div style={{ marginTop: 80 }}>
      <p>Lost Pets</p>
      {pets.map((pet) => {

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
