import React, { useEffect, useState, useContext } from "react";
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
  const { pets, setPets } = useContext(VariablesContext);
  useEffect(() => {
    fetch("http://localhost:5000/pets/found")
      .then((res) => res.json())
      .then((data) => setPets(data));
  }, []);
  return (
    <div style={{ marginTop: 200 }}>
      <p>All animals</p>
      {pets.map((pet) => {
        return (
          <Card className={classes.root} key={`found ${pet._id}`}>
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
                  {pet.breed} - {pet.type}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {pet.info}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}
