import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { VariablesContext } from "../context/VariablesContext";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const serverURL = require("../config.js").serverURL;

const useStyles = makeStyles({
  buttonRemove: {
    padding: "1px 3px 1px 3px",
    height: "fit-content",
    marginBottom: "5px",
    marginRight: 20,
  },
});

const RemoveComment = (props) => {
  const classes = useStyles();
  // const [data, setData] = useState([]);
  let { countComment, setCountComment, onePet, setOnePet } =
    useContext(VariablesContext);
  let userId = localStorage.getItem("userId");
  let userCommentId = props.userID;
  let commentId = props.commentId;
  let comments = props.comments;
  let petId = props.petID;
  let comment = props.comment;
  // console.log("comment", commentId);

  // console.log(petId);
  // console.log(commentId);
  // console.log("comm", comments);
  // let removeCountComment = () => {
  //   setCountComment((countComment -= 1));
  // };

  const deleteComment = () => {
    fetch(`${serverURL}/pets/deleteComment/${petId}/${commentId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((result) => {
        console.log(result);
        // const newData = comments.filter((item) => {
        //   return item._id !== commentId;
        // });
        // setData(newData);
        setOnePet(result);
      })
      .catch((err) => console.log(err));
  };
  // console.log("data comm", data);
  // let fetchAndRemove = () => {
  //   deleteComment();
  //   removeCountComment();
  // };
  return (
    <div>
      {userId === userCommentId && (
        <button
          className={classes.buttonRemove}
          onClick={() => deleteComment()}
        >
          <DeleteForeverIcon />
        </button>
      )}
    </div>
  );
};

export default RemoveComment;
