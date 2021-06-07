import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function PetsLost() {
  const classes = useStyles();
  const [pets, setPets] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/pets/all")
      .then((res) => res.json())
      .then((data) => setPets(data));
  }, []);
  return (
    <div style={{ marginTop: 200 }}>
      <p>All animals</p>
      {pets.map((pet) => {
        return (
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={pet.image}
                title="Contemplative Reptile"
              />

              <CardContent>
                <img src="../img/labrador.jpg" alt="labrador" />
                <Typography gutterBottom variant="h5" component="h2">
                  {pet.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
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
