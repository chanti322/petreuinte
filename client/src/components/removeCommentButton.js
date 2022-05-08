import React, {  useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { VariablesContext } from "../context/VariablesContext";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const serverURL = require("../config.js").serverURL;

const useStyles = makeStyles({
  buttonRemove: {
    padding: "1px 3px 1px 3px",
    height: "fit-content",
    marginBottom: "5px",
  
  },
});

const RemoveComment = (props) => {
  const classes = useStyles();

  let {  setOnePet } =
    useContext(VariablesContext);
  let userId = localStorage.getItem("userId");
  let userCommentId = props.userID;
  let commentId = props.commentId;

  let petId = props.petID;
  

  const deleteComment = () => {
    fetch(`${serverURL}/pets/deleteComment/${petId}/${commentId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
       
        return res.json();
      })
      .then((result) => {
    
        setOnePet(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{display:"flex", width:"350px", justifyContent:"flex-end"}}>
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
