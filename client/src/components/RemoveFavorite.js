import React, { useState, useEffect, useContext } from "react";
import { VariablesContext } from "../context/VariablesContext";

import FavoriteIcon from "@material-ui/icons/Favorite";
export default function RemoveFavorite(props) {
  const { heart, setHeart, userFavoritesArray,
    setUserFavoritesArray, } = useContext(VariablesContext);

  const petId = props.petId;
  const userId = localStorage.getItem("userId");
  let userFavorites = props.petFavorite;
  console.log("userFav", userFavorites);
  const serverURL = require("../config.js").serverURL;
  function heartButton() {
    setHeart((prev) => (prev -= 1));
  }

  console.log("heartRem", heart);
  let removeFavorite = () => {
    fetch(serverURL + "/pets/removeFavorite", {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        favorite: -1,
        petId,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("bothin Rem", data)
        console.log("favoritesinREm", data.removeOneFav.favorite);
        setUserFavoritesArray(data.removeFavUser.favorites)
      });
  };
  let removeFavoriteAndFetch = () => {
    removeFavorite();
    heartButton();
  };
  console.log("userfavinREmbutton", userFavoritesArray)
  return (
    <div>
      <button onClick={removeFavoriteAndFetch}>
        <FavoriteIcon />
      </button>
    </div>
  );
}
