import React, { useState, useEffect, useContext } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { VariablesContext } from "../context/VariablesContext";
import { AuthContext } from "../context/AuthContext";
const serverURL = require("../config.js").serverURL;

export default function ManageFavorite(props) {
  const [favorite, setFavorite] = useState([]);
  const { heart, setHeart } = useContext(VariablesContext);
/*   const {  userId, setUserId } =
    useContext(AuthContext); */
  const petId = props.petId;
 const userId = localStorage.getItem("userId");
  console.log("varUser", userId);
  let userFavorites = props.petFavorite;
  console.log("userFav", userFavorites);
  console.log("petId", petId);

  function heartButton() {
    setHeart((prev) => (prev += 1));
  }

  let addFavorite = () => {
    fetch(serverURL + "/pets/addFavorite", {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        petId,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("datafav", data);
      });
  };
  let addFavoriteAndFetch = () => {
    heartButton();
    addFavorite();
  };
  console.log("heartAdd", heart);
  return (
    <div>
      <button onClick={addFavoriteAndFetch}>
        <FavoriteBorderIcon />
      </button>
    </div>
  );
}
