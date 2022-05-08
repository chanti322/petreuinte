import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { VariablesContext } from "../context/VariablesContext";
import { AuthContext } from "../context/AuthContext";
const useStyles = makeStyles({
  commentBtn: {
    backgroundColor: "orange",
    padding: 5,
    borderRadius: 4,
    marginLeft: 7,
    fontStyle: "italic",
  },
  commentInput:{
    marginBottom: "12vh", width: 350, margin: "0 auto",
  }
});
const serverURL = require("../config.js").serverURL;
const Comment = (props) => {
  const classes = useStyles();
  let { countComment, setCountComment, setOnePet } =
    useContext(VariablesContext);
    const {  userId } =
    useContext(AuthContext);
  const [text, setText] = useState("");

  const loggedIn = localStorage.getItem("loggedIn");

  const avatar = localStorage.getItem("userAvatar");

  const username = localStorage.getItem("usernameStorage");

  let petId = props.petId;


  let commentFetch = () => {
    fetch(serverURL + "/pets/comments", {
      method: "put",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        petId,
        text,
        avatar,
        username,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {

        setCountComment((countComment += 1));
        setOnePet(data);
      });
  };


  return (
    <div className={classes.commentInput}>
      {loggedIn ? (
        <div>
          <input
            style={{
              marginTop: 10,
              marginBottom: 15,
              width: "80%",
              padding: 7,
            }}
            type="text"
            placeholder="add a comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className={classes.commentBtn} onClick={commentFetch}>
            Send
          </button>
        </div>
      ) : (
        <p>Please Log in to write a comment</p>
      )}
    </div>
  );
};
export default Comment;


