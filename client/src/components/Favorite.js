import React, { useState, useEffect } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

export default function ManageFavorite(props) {
  const [favorite, setFavorite] = useState(0);
  const [heart, setHeart] = useState(false);

  const petId = props.petId;
  const userId = localStorage.getItem("userId");
  console.log("varUser", userId);
  let userFavorites = props.petFavorite;
  console.log("userFav", userFavorites);

  function heartButton() {
    setHeart((prev) => !prev);
  }

  let addFavorite = () => {
    fetch("http://localhost:5000/pets/addFavorite", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        favorite: 1,
        petId,
        userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("favorites", data);
      });
  };
  let addFavoriteAndFetch = () => {
    addFavorite();
    // heartButton();
  };

  return (
    <div>
      <button onClick={addFavoriteAndFetch}>
        <FavoriteBorderIcon />
      </button>
    </div>
  );
}
