import React, { useState,  useEffect } from "react";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Comment from "../components/CommentForm"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ConvertedAddress from "../components/ConvertedAddress"
import DisplayComment from "./displayComment"


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function SinglePet(props) {
    let history = useHistory();
  const [onePet, setOnePet] = useState([])
  let { id } = useParams();
  console.log("id", id)
  useEffect(() => {
    const singlePetfetch = () => {
      fetch(`http://localhost:5000/pets/details/${id}`)
        .then(res =>  res.json() )
        .then(data => {
          console.log("data", data)
          setOnePet(data)
          
        })
    }
    singlePetfetch()
  }, [])
  console.log("onePettype",onePet.type)
  console.log("onePetmarker",onePet.markers)
 const classes = useStyles();

  return (<div style={{marginTop:90}}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={onePet.img}
          title="Pet"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           {onePet.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {onePet.type} - {onePet.breed}
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {onePet.info}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <ConvertedAddress markersOne={onePet.markers} />
            </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
     
        <button onClick={ () => history.goBack() }>
       Go Back
        </button>
        <Comment petId={id} />
      </CardActions>
    </Card>
    <DisplayComment petId={id}/>
    </div>
  );
}




