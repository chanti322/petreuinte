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
import ConvertedAddress from "./ConvertedAddress"



const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    display: "flex",
    flexDirection: "column",

    margin:5
  },
});


export default function CardPet(props) {
  let pet = props.pet
  console.log("petincard", pet)
   const classes = useStyles();
        return (
          <Card className={classes.root} key={`found ${pet._id}`}>
             <Link style={{textDecoration:"none"}} to={`details/${pet._id}`}>
            <CardActionArea>
             
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={pet.img}
                title="Contemplative Reptile"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="h2" style={{color:"black"}}>
                 {pet.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                 <span style={{fontWeight:"bold"}}>Breed:</span> {pet.breed} 
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
            <span  style={{fontWeight:"bold"}}>Specie: </span>  {pet.type}
                  </Typography>
                         <Typography variant="body2" color="textSecondary" component="p">
                            <ConvertedAddress markers={pet.markers}/>
                        </Typography>
                        
              </CardContent>
              </CardActionArea>
              </Link>
            <CardActions>
           
              <Button size="small" color="primary">
                <Link style={{textDecoration:"none", color:"orange"}} to={`details/${pet._id}`}>

                 More information
                    </Link>
              </Button>
              
            </CardActions>
          </Card>)
      
}
