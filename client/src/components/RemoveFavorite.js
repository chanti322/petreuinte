import React, { useState, useEffect, useContext } from "react";
import { VariablesContext } from "../context/VariablesContext";

import FavoriteIcon from "@material-ui/icons/Favorite";
export default function RemoveFavorite(props) {
  const [favorite, setFavorite] = useState(0);
  const { heart, setHeart } = useContext(VariablesContext);

  const petId = props.petId;
  const userId = localStorage.getItem("userId");
  let userFavorites = props.petFavorite;
  console.log("userFav", userFavorites);

  function heartButton() {
    setHeart((prev) => (prev -= 1));
  }
  console.log("heartRem", heart);
  let removeFavorite = () => {
    fetch("http://localhost:5000/pets/removeFavorite", {
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
        console.log("favorites", data);
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
