import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import ConvertedAddress from "../components/ConvertedAddress";
import Card from "@material-ui/core/Card";
import { Paper } from "@material-ui/core";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: 15,
    boxShadow: "10px 10px 5px -1px rgba(0,0,0,0.46)",
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
  },
}));
export default function UserProfile() {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const [userProfilePosts, setUserProfilePosts] = useState([]);

  return (
    <div style={{ marginTop: 70, marginBottom: "10vh", width: "100vw" }}>
      <h2>Your Post</h2>
      <div>
        {userProfilePosts.length > 0 &&
          userProfilePosts[0].pets.map((post) => {
            return (
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    style={{ borderRadius: 15 }}
                    className={classes.media}
                    image={post.img}
                    title="Pet"
                  />

                  <CardContent>
                    <Typography
                      style={{ fontWeight: "bold", backgroundColor: "orange" }}
                      gutterBottom
                      variant="h5"
                      component="h2"
                    >
                      {post.name}
                    </Typography>

                    <div></div>
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
                    <Link to={`details/${post._id}`}>
                      <button className={classes.seeMoreButton}>
                        See more
                      </button>{" "}
                    </Link>
                  </div>
                </CardActions>
              </Card>
            );
          })}
      </div>
    </div>
  );
}
