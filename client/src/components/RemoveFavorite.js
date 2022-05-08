import React, {  useContext } from "react";
import { VariablesContext } from "../context/VariablesContext";

import FavoriteIcon from "@material-ui/icons/Favorite";
export default function RemoveFavorite(props) {
  const { setHeart, userFavoritesArray,
    setUserFavoritesArray, } = useContext(VariablesContext);

  const petId = props.petId;
  const userId = localStorage.getItem("userId");

  const serverURL = require("../config.js").serverURL;
  function heartButton() {
    setHeart((prev) => (prev -= 1));
  }

 
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

        setUserFavoritesArray(data.removeFavUser.favorites)
      });
  };
  let removeFavoriteAndFetch = () => {
    removeFavorite();
    heartButton();
  };

  return (
    <div>
      <button onClick={removeFavoriteAndFetch}>
        <FavoriteIcon />
      </button>
    </div>
  );
}
