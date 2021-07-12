import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import RemoveComment from "../components/removeCommentButton";

import { Grid } from "@material-ui/core";
const useStyles = makeStyles({
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
});

const DisplayComment = (props) => {
  const classes = useStyles();
  let petComments = props.petComments;
  console.log(petComments);

  return (
    <div style={{ marginTop: 10 }}>
      <ul>
        {petComments !== undefined &&
          petComments.map((link) => (
            <li className={classes.liComment} key={link._id}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Grid container xs={12}>
                  <Grid
                    item
                    xs={2}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <img
                      src={link.avatar}
                      alt="avatar"
                      className={classes.avatarPic}
                    />
                    <p
                      style={{ marginLeft: 5 }}
                      className={classes.nameUserComm}
                    >
                      {link.username}
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p className={classes.textComment}>{link.text}</p>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    style={{ display: "flex", alignItems: "flex-end" }}
                  >
                    <RemoveComment
                      commentId={link._id}
                      userID={link.userId}
                      petID={props.petId}
                      comments={petComments}
                    />
                  </Grid>
                </Grid>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
export default DisplayComment;
