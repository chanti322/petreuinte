import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BackAtHome from "./BackAtHomeButton";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ConvertedAddress from "./ConvertedAddress";
import ManageFavorite from "./Favorite";
import RemoveFavorite from "./RemoveFavorite";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,

    display: "flex",
    flexDirection: "column",

    margin: 5,
    marginBottom: "10vh",
  },
  mask: {
    backgroundColor: "black",
    opacity: 0.7,
    width: 345,

    zIndex: 3,
    height: "100%",

    position: "absolute",
  },
});

export default function CardPet(props) {
  let pet = props.pet;
  let favoriteUser = localStorage.getItem("userFavorites");
  const userId = localStorage.getItem("userId");
  console.log("userCard", userId);

  const [userProfile, setUserProfile] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [idFavorites, setIdFavorites] = useState([]);
  console.log("favRealUser", favoriteUser);
  console.log("pet", pet);
  console.log("favoriteUser", pet.userId.favorites);
  console.log("petincard", pet);
  const classes = useStyles();
  useEffect(() => {
    // if (accessToken) {
    fetch(`http://localhost:5000/users/userProfile/favorites/${userId}`, {
      /*   headers: {
          "Authorization": "Bearer " + localStorage.getItem("accessToken")
        }  */
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUserProfile(data);
        setUserFavorites(data[0].favorites);
        console.log("postcard", data[0].favorites);
      })
      .catch((err) => {
        console.log(err);
      });
    /*   }else {
      console.log("You have to logIn")
    }  */
  }, []);
  useEffect(() => {
    let getIdfavorites = () => {
      userFavorites.map((fav) => {
        setIdFavorites((prev) => [...prev, fav._id]);
      });
    };
    getIdfavorites();
  }, []);
  console.log("iddd", idFavorites);
  return (
    <Card className={classes.root} key={`found ${pet._id}`}>
      <Link style={{ textDecoration: "none" }} to={`details/${pet._id}`}>
        <div
          style={{
            display: "flex",
            margin: 10,
            justifyContent: "space-between",
          }}
        >
          <img
            src={pet.userId.pic}
            style={{ width: 50, height: 50, borderRadius: 100 }}
          />
          <p style={{ fontSize: 20, fontWeight: "bold", fontStyle: "italic" }}>
            {pet.userId.username}
          </p>
        </div>
        <CardActionArea>
          {pet.inSave === true && (
            <div className={classes.mask}>
              <p
                style={{
                  color: "white",
                  marginTop: 100,
                  fontWeight: "bold",
                  fontSize: 30,
                }}
              >
                Back at Home
              </p>
            </div>
          )}
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={pet.img}
            title="Contemplative Reptile"
          />

          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ color: "black" }}
            >
              {pet.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <span style={{ fontWeight: "bold" }}>Breed:</span> {pet.breed}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <span style={{ fontWeight: "bold" }}>Specie: </span> {pet.type}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <ConvertedAddress markers={pet.markers} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button size="small" color="primary">
          <Link
            style={{ textDecoration: "none", color: "orange" }}
            to={`details/${pet._id}`}
          >
            More information
          </Link>
        </Button>
        {idFavorites !== undefined && idFavorites.includes(pet._id) ? (
          <RemoveFavorite petId={pet._id} />
        ) : (
          <ManageFavorite petId={pet._id} />
        )}
        {/* <div>
          
        </div>

        <div>
         
        </div> */}

        <BackAtHome
          userIdOfThePost={pet.userId}
          petId={pet._id}
          inSave={pet.inSave}
        />
      </CardActions>
    </Card>
  );
}
