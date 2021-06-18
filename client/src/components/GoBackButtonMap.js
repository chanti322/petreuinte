import React from "react";
import { useHistory } from "react-router-dom";


const marginAppBarElem = {
  margin: 10,
};
export  const GoBackButtonMap = () => {
  let history = useHistory();

/*   function goBack() {
    history.goBack();
      localStorage.getItem('imageInLocalStorage')
  } */
  return (
    <>
      <button onClick={ () => history.goBack() } style={marginAppBarElem}>
       Save
      </button>
    </>
  );
};