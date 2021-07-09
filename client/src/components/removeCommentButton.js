import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { VariablesContext } from "../context/VariablesContext";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

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
  const [data, setData] = useState([]);
  let { countComment, setCountComment } = useContext(VariablesContext);
  let userId = localStorage.getItem("userId");
  let userCommentId = props.userID;
  let commentId = props.commentId;
  let petId = props.petID;
  console.log(petId);
  console.log(commentId);
  let removeCountComment = () => {
    setCountComment((countComment -= 1));
  };

  const deleteComment = () => {
    fetch("serverURL/pets/deleteComment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        petId,
        commentId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  let fetchAndRemove = () => {
    deleteComment();
    removeCountComment();
  };
  return (
    <div>
      {userId === userCommentId && (
        <button className={classes.buttonRemove} onClick={fetchAndRemove}>
          <DeleteForeverIcon />
        </button>
      )}
    </div>
  );
};

export default RemoveComment;
