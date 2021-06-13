import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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


export default function CardPet(props) {
    let pet= props.pet
   const classes = useStyles();
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
                <Link to={`details/${pet._id}`}>

                  Learn More
                    </Link>
              </Button>
            </CardActions>
          </Card>)
      
}
