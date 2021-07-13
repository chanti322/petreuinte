import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { VariablesContext } from "../context/VariablesContext";
import BackAtHome from "./BackAtHomeButton";
import RemovePost from "./RemovePostButton";
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
const serverURL = require("../config.js").serverURL;
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
  let petId = pet._id;
  console.log("pet fav in card", pet.favorite.length);
  // console.log("name", pet.userId.username);
  const {
    heart,
    setHeart,
    removePost,
    setRemovePost,
    userFavoritesArray,
    setUserFavoritesArray,
  } = useContext(VariablesContext);
  let favoriteUser = localStorage.getItem("userFavorites");
  const userId = localStorage.getItem("userId");
  // console.log("userCard", userId);
  // console.log("heart in card", heart);
  // console.log("pet", pet);

  const [userProfile, setUserProfile] = useState([]);
  //const [userFavorites, setUserFavorites] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  // console.log("favRealUser", favoriteUser);
  // console.log("pet", pet);
  // console.log("favoriteUser", pet.userId.favorites);
  // console.log("petincard", pet);
  // console.log("userFavo", userFavorites);
  const classes = useStyles();
  let accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      fetch(`${serverURL}/users/userProfile/favorites/${userId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setUserProfile(data);
          //    setUserFavorites(data[0].favorites);
          setUserFavoritesArray(data[0].favorites);

          console.log("postcard", data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("You have to logIn");
      setErrorMessage("You have to login to add a like");
    }
  }, [heart, removePost]);
  console.log("heart", heart);
  ///Get favorite
  /*  useEffect(() => {
    let numberOfFavoriteFetch = () => {
      fetch(`${serverURL}/pets/favorite/${petId}`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          console.log("fav Data", data);
        });
    };
    numberOfFavoriteFetch();
  }, [heart]); */

  return (
    <Card className={classes.root} key={`found ${pet._id}`}>
      <div
        style={{
          display: "flex",
          margin: 10,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <img
            src={pet.userId.pic}
            style={{ width: 50, height: 50, borderRadius: 100 }}
          />
          <p
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontStyle: "italic",
              marginLeft: 5,
            }}
          >
            {pet.userId.username}
          </p>
        </div>
        {pet.userId._id === userId && <RemovePost petId={pet._id} />}
      </div>
      <Link style={{ textDecoration: "none" }} to={`details/${pet._id}`}>
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

          <CardContent style={{ backgroundColor: "rgb(220,220,220)" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              style={{ color: "black", fontStyle: "italic" }}
            >
              {pet.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <span style={{ fontWeight: "bold" }}>Breed:</span> {pet.breed}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <span style={{ fontWeight: "bold" }}>ID:</span> {pet._id}
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
      <CardActions style={{ justifyContent: "space-evenly" }}>
        <Button size="small" color="primary">
          <Link
            style={{ textDecoration: "none", color: "orange" }}
            to={`details/${pet._id}`}
          >
            More information
          </Link>
        </Button>
        {userFavoritesArray !== undefined &&
        userFavoritesArray.filter(function (e) {
          return e._id === pet._id;
        }).length > 0 ? (
          <RemoveFavorite petId={pet._id} />
        ) : (
          <ManageFavorite petId={pet._id} />
        )}
        <p style={{ fontSize: 25 }}>{pet.favorite.length}</p>
        <p>{errorMessage}</p>
        <BackAtHome
          userIdOfThePost={pet.userId}
          petId={pet._id}
          inSave={pet.inSave}
        />
      </CardActions>
    </Card>
  );
}
