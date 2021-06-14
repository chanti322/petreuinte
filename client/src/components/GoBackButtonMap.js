import React from "react";
import { useHistory } from "react-router-dom";


const marginAppBarElem = {
  margin: 10,
};
export  const GoBackButtonMap = () => {
  let history = useHistory();
  return (
    <>
      <button onClick={() => history.goBack()} style={marginAppBarElem}>
       Save
      </button>
    </>
  );
};