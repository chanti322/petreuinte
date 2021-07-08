import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fadeInLeft, fadeInRight } from "react-animations";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../logo.png";
import "../styles/style.css";
const useStyles = makeStyles({
  blockDiv: {
    width: 300,
    height: "210px",
    margin: "0 auto",
    marginBottom: 20,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Zilla Slab",
    fontWeight: 900,
    padding: 10,
    fontSize: 20,
    /*   "&:hover": {
      opacity: 0.7,
    }, */
  },
  linksStyle: {
    textDecoration: "none",
    cursor: "pointer",
  },
  greyColor: {
    background: "grey",
  },
});
const FadeIn = styled.div`
  animation: 2s ${keyframes`${fadeInLeft}`};
`;
const FadeInRight = styled.div`
  animation: 2s ${keyframes`${fadeInRight}`};
`;
const Home = () => {
  const classes = useStyles();

  return (
    <div style={{ marginTop: 57, width: 360 }}>
      <img
        style={{ width: 150, heigth: 80 }}
        src={"https://media.giphy.com/media/pr8VrXb549IoHlDaOM/giphy.gif"}
        alt="logo"
      />

      <Link className={classes.linksStyle} to="/petsLost">
        <FadeIn>
          <div
            style={{
              textAlign: "right",
              padding: 10,
              boxShadow: "14px 10px 5px 0px rgba(20,133,94,0.75)",
            }}
            className={classes.blockDiv}
          >
            <img
              style={{
                width: "70%",
                height: "50%",
                marginTop: 20,
                opacity: 0.7,
              }}
              src={
                "https://cdn.pixabay.com/photo/2020/04/24/08/57/street-5085971__340.jpg"
              }
            />
            <div style={{ position: "relative", top: -50, color: "black" }}>
              <h2
                style={{
                  color: "black",
                  marginBotton: 5,
                }}
              >
                Lost Pets
              </h2>
              <p
                style={{
                  color: "black",
                  marginBottom: 15,
                  marginTop: 18,
                  fontSize: 18,
                  fontStyle: "italic",

                  // backgroundColor: "rgba(232, 232, 232, 0.7)",
                }}
              >
                Has your beloved animal disappeared? Register its profile in the
                app and let the FindMyPet community help you bring your pet at
                home.
              </p>
            </div>
          </div>
        </FadeIn>
      </Link>
      <Link className={classes.linksStyle} to="/petsFound">
        {" "}
        <FadeInRight>
          <div
            style={{
              boxShadow: "-12px 10px 5px 0px rgba(204,117,33,0.75)",
              marginLeft: 15,
            }}
            className={classes.blockDiv}
          >
            <img
              style={{
                width: "70%",
                height: "70%",
                marginTop: 40,
                opacity: 0.7,
                marginLeft: "30%",
              }}
              src={
                "https://cdn.pixabay.com/photo/2020/03/02/10/58/dog-4895337__340.jpg"
              }
            />
            <div style={{ position: "relative", top: -50, color: "black" }}>
              <h2
                style={{
                  color: "black",
                  marginLeft: 15,
                  textAlign: "left",
                }}
              >
                Spotted Pets
              </h2>
              <p
                style={{
                  marginTop: 15,
                  color: "black",
                  maxWidth: "90%",
                  textAlign: "left",
                  fontSize: 18,
                  fontStyle: "italic",
                }}
              >
                Have you seen a lost animal in the street? Write a post to help
                it
              </p>
            </div>
          </div>
        </FadeInRight>
      </Link>
      <Link className={classes.linksStyle} to="/inSave">
        {" "}
        <FadeIn>
          {" "}
          <div
            style={{
              marginBottom: "18vh",
              boxShadow: "14px 10px 5px 0px rgba(49,133,20,0.75)",
              textAlign: "right",
            }}
            className={classes.blockDiv}
          >
            <img
              style={{
                width: "70%",
                height: "70%",
                marginTop: 40,
                opacity: 0.7,
              }}
              src={
                "data:image/jpeg;base64,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"
              }
            />
            <div style={{ position: "relative", top: -50, color: "black" }}>
              <h2 style={{}}>Back at home</h2>
              <p style={{ fontSize: 18, fontStyle: "italic", marginTop: 15 }}>
                We believe in stories with happy endings. They have been found
                and are safe at home.
              </p>
            </div>
          </div>
        </FadeIn>
      </Link>
    </div>
  );
};
export default Home;
