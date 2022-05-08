import React, { useState, createContext } from "react";
const initContextVariables = {
  pets: [],
  markers: [],
  name: "",
  type: "",
  breed: "",
  url: "",
  info: "",
  image: "",
  color: "",
  radio: "",
  addressPet: "",

  countComment: 0,
  countInSave: 0,
  heart: 0,
  //isLoggedIn: false,
  removePost: false,
  usernameStorage: "",
  userFavoritesArray: [],
  onePet: null,
};

export const VariablesContext = createContext(initContextVariables);

export const VariablesContextProvider = ({ children }) => {
  const [pets, setPets] = useState(initContextVariables.pets);
  const [onePet, setOnePet] = useState(initContextVariables.onePet);
  const [name, setName] = useState(initContextVariables.name);
  const [type, setType] = useState(initContextVariables.type);
  const [breed, setBreed] = useState(initContextVariables.breed);
  const [url, setUrl] = useState(initContextVariables.url);
  const [info, setInfo] = useState(initContextVariables.info);
  const [image, setImage] = useState(initContextVariables.image);
  const [color, setColor] = useState(initContextVariables.color);
  const [radio, setRadio] = useState(initContextVariables.radio);
  const [markers, setMarkers] = useState(initContextVariables.markers);
  const [addressPet, setAddressPet] = useState(initContextVariables.addressPet);
  // const [isLoggedIn, setIsLoggedIn] = useState(initContextVariables.isLoggedIn);
  const [countComment, setCountComment] = useState(
    initContextVariables.countComment
  );
  const [removePost, setRemovePost] = useState(initContextVariables.removePost);
  const [countInSave, setCountInSave] = useState(
    initContextVariables.countInSave
  );
  const [heart, setHeart] = useState(initContextVariables.heart);
  const [usernameStorage, setUsernameStorage] = useState(
    initContextVariables.usernameStorage
  );
  const [userFavoritesArray, setUserFavoritesArray] = useState(
    initContextVariables.userFavoritesArray
  );


  return (
    <VariablesContext.Provider
      value={{
        pets,
        setPets,
        onePet,
        setOnePet,
        name,
        setName,
        type,
        setType,
        breed,
        setBreed,
        url,
        setUrl,
        info,
        setInfo,
        image,
        setImage,
        color,
        setColor,
        radio,
        setRadio,
        markers,
        setMarkers,
        addressPet,
        setAddressPet,

        countComment,
        setCountComment,
        countInSave,
        setCountInSave,
        heart,
        setHeart,
        removePost,
        setRemovePost,
        usernameStorage,
        setUsernameStorage,
        userFavoritesArray,
        setUserFavoritesArray,
      }}
    >
      {children}
    </VariablesContext.Provider>
  );
};
