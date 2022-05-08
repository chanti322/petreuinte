import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { VariablesContext } from "../context/VariablesContext";

import Card from "@material-ui/core/Card";
import { Paper } from "@material-ui/core";
import { BrowserRouter as  Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

import RemoveFavorite from "../components/RemoveFavorite";
const serverURL = require("../config.js").serverURL;
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: 15,
    marginTop: 15,
    boxShadow: "10px 10px 5px 0px rgba(204,117,33,0.75)",
  },
  media: {
    width: "80%",
    margin: "0 auto",
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  textComment: {
    fontSize: 15,
    textAlign: "left",
    padding: 7,
  },
  liComment: {
    listStyle: "none",
    borderBottom: "1px solid black",
  },
  avatarPic: {
    width: "30px",
    height: "30px",
    padding: 7,
  },
  nameUserComm: {
    fontSize: 10,
    fontStyle: "italic",
  },
  buttonRemove: {
    padding: 2,
    height: "fit-content",
    marginBottom: "5px",
  },
  seeMoreDiv: {
    display: "flex",
    justifyContent: "center",
  },
  seeMoreButton: {
    padding: 5,
    color: "orange",
    fontWeight: "bold",

    borderRadius: 20,
  },
}));
export default function UserProfile() {
  const classes = useStyles();
  const { heart } = useContext(VariablesContext);
  const userId = localStorage.getItem("userId");
 
  const username = localStorage.getItem("usernameStorage");
  const userEmail = localStorage.getItem("userEmail");
  const [userProfilePosts, setUserProfilePosts] = useState([]);
  useEffect(() => {
    let profileFetch = () => {
      fetch(`${serverURL}/users/userProfile/${userId}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
      
          setUserProfilePosts(data);
        });
    };
    profileFetch();
  }, [heart]);

  return (
    <div style={{ marginTop: 70, marginBottom: "12vh", width: "100vw" }}>
      <h2>Your Details:</h2>
      <Paper style={{ padding: 10, margin: 10 }}>
        <p>
          <span style={{ fontWeight: "bold" }}>Name:</span> {username}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Email:</span> {userEmail}
        </p>
      </Paper>
      <hr></hr>
      <h2
        style={{
          margin: 15,
          fontSize: 40,
          fontWeight: "bold",

          fontFamily: "Great Vibes",
        }}
      >
        Your Posts
      </h2>
      <hr></hr>
      <div>
        {userProfilePosts.length > 0 &&
          userProfilePosts[0].pets.map((post) => {
            return (
              <Card className={classes.root}>
                <CardActionArea>
                  <div>
                    <CardMedia
                      style={{ borderRadius: 15 }}
                      className={classes.media}
                      image={post.img}
                      title="Pet"
                    />
                    <Typography
                      style={{
                        padding: 5,
                        fontWeight: "bold",
                        backgroundColor: "rgba(255,165,0,0.6)",
                        position: "absolute",
                        top: 10,
                        right: 15,
                      }}
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      {post.name}
                    </Typography>
                  </div>
                  <CardContent>
                    <ul>
                      {post.comments.map((comment) => {
                        return (
                          <li className={classes.liComment} key={comment._id}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Grid container xs={12}>
                                <Grid
                                  item
                                  xs={2}
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <img
                                    src={comment.avatar}
                                    alt="avatar"
                                    className={classes.avatarPic}
                                  />
                                  <p
                                    style={{ marginLeft: 5 }}
                                    className={classes.nameUserComm}
                                  >
                                    {comment.username}
                                  </p>
                                </Grid>
                                <Grid item xs={8}>
                                  <p className={classes.textComment}>
                                    {comment.text}
                                  </p>
                                </Grid>
                                <Grid
                                  item
                                  xs={2}
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                  }}
                                ></Grid>
                              </Grid>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    ></Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    ></Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <div className={classes.seeMoreDiv}>
                    <Link
                      to={`details/${post._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <h3 className={classes.seeMoreButton}>See more</h3>
                    </Link>
                  </div>
                </CardActions>
              </Card>
            );
          })}
      </div>
      <hr style={{ marginTop: 30 }}></hr>
      <h2
        style={{
          margin: 15,
          fontSize: 40,
          fontWeight: "bold",
          fontFamily: "Great Vibes",
        }}
      >
        Your favorite Posts
      </h2>
      <hr></hr>
      <ul>
        {userProfilePosts.length > 0 &&
          userProfilePosts[0].favorites.map((fav) => {
            return (
              <li>
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    width: "90%",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: 5,
                    boxShadow: "10px 10px 5px 0px rgba(204,117,33,0.75)",
                  }}
                >
                  <img
                    style={{ width: 70, height: 60, borderRadius: 5 }}
                    src={fav.img}
                    alt="pet"
                  />
                  <p style={{ fontSize: 25, fontWeight: "bold" }}>{fav.name}</p>
                  <RemoveFavorite petId={fav._id} />
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
