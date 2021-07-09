import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
export default function Footer() {
  useEffect(() => {
    let userAvatar = localStorage.getItem("userAvatar");
  }, []);
  let userAvatar = localStorage.getItem("userAvatar");
  let userName = localStorage.getItem("usernameStorage");
  let history = useHistory();
  let footerStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: " #ff8c00",
    background: "linear-gradient(62deg, #ff8c00 0%, #f7ce68 100%)",
    height: "10vh",
    width: "100%",
    position: "fixed",
    zIndex: 10,
    bottom: 0,
  };
  let footerText = {
    display: "flex",
    justifyContent: "center",
    marginTop: 8,
    fontWeight: 600,
  };

  return (
    <div>
      <div style={footerStyle}>
        <button
          style={{
            width: 30,
            position: "absolute",
            left: 20,
            top: 10,
            backgroundColor: "orange",
            color: "black",
          }}
          onClick={() => history.goBack()}
        >
          <KeyboardArrowLeftIcon />
        </button>

        <p style={footerText}> FindMyPet</p>

        <p style={footerText}> | Created by Laura Tronchin |</p>
        {userAvatar && (
          <Link to="userProfile">
            <img
              src={userAvatar}
              style={{
                width: 40,
                position: "absolute",
                top: 10,
                right: 10,
                borderRadius: "100%",
              }}
              alt="avatar"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
