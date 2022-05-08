import React, {  useContext } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { VariablesContext } from "../context/VariablesContext";
const serverURL = require("../config.js").serverURL;
export default function RemovePost(props) {
  const {  setRemovePost } = useContext(VariablesContext);
  const userId = localStorage.getItem("userId");
  const postId = props.petId;
 

  let deletePostFetch = () => {
    fetch(serverURL + "/pets/deletePost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
  
      });
  };
  let removePostFunction = () => {
    setRemovePost((prev) => !prev);
  };
  let removeAndFetch = () => {
    deletePostFetch();
    removePostFunction();
  };
  return (
    <div>
      <button onClick={removeAndFetch}>
        <DeleteIcon></DeleteIcon>
      </button>
    </div>
  );
}
