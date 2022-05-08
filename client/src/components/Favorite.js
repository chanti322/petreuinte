import React, { useContext } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { VariablesContext } from "../context/VariablesContext";

const serverURL = require("../config.js").serverURL;

export default function ManageFavorite(props) {
 
  const { heart, setHeart, userFavoritesArray,
    setUserFavoritesArray, } = useContext(VariablesContext);

  const petId = props.petId;
 const userId = localStorage.getItem("userId");

  let userFavorites = props.petFavorite;


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
    
        setUserFavoritesArray(data.addFavUser.favorites)
      });
  };
  let addFavoriteAndFetch = () => {
    heartButton();
    addFavorite();
  };

  return (
    <div>
      <button onClick={addFavoriteAndFetch}>
        <FavoriteBorderIcon />
      </button>
    </div>
  );
}
