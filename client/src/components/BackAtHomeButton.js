import React, { useState, useContext } from "react";
import { VariablesContext } from "../context/VariablesContext";
import {AuthContext} from "../context/AuthContext"
const serverURL = require("../config.js").serverURL;
export default function BackAtHome(props) {
  const {userId, setUserId } =
    useContext(AuthContext);
  let userIdOfThePost = props.userIdOfThePost._id;

  let petId = props.petId;
  let petInSave = props.inSave;

  const [inSavePet, setInSavePet] = useState(true);
  const [showCheck, setShowCheck] = useState(false);
  let { countInSave, setCountInSave } = useContext(VariablesContext);
  
  let inSaveTrue = () => {
    setInSavePet(true);
  };
  let addCount = () => {
    setCountInSave((countInSave += 1));
  };
  let showCheckText = () => {
    setShowCheck(true);
  };
  let hideCheckText = () => {
    setShowCheck(false);
  };
  let inSaveFetch = () => {
    fetch(serverURL +"/pets/atHome", {
      method: "put",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        inSavePet,
        petId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
 
      });
  };
  function addSaveAndFetch() {
   
    inSaveFetch();
    addCount();
  }
  //Style
  let buttonStyle = {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 20,
    marginLeft: 30,
    color: "white",
  };
  let buttonYes = {
    padding: 5,
    fontWeight: "bold",
    margin: 5,
    marginRight: 25,
    color: "green",
  };
  let buttonNo = {
    padding: 5,
    fontWeight: "bold",
    margin: 5,
    color: "red",
  };
  return (
    <div>
      {userId === userIdOfThePost && !petInSave && (
        <button onClick={showCheckText} style={buttonStyle}>
          Back at home
        </button>
      )}
      {showCheck && (
        <div>
          <p style={{ margin: 10 }}>Is it your Pet back at home?</p>
          <button style={buttonYes} onClick={addSaveAndFetch}>
            Yes
          </button>
          <button style={buttonNo} onClick={hideCheckText}>
            No
          </button>
        </div>
      )}{" "}
    </div>
  );
}
