import React, { useState, useEffect, useContext } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { VariablesContext } from "../context/VariablesContext";

export default function ManageFavorite(props) {
  const [favorite, setFavorite] = useState(0);
  const { heart, setHeart } = useContext(VariablesContext);

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
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
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