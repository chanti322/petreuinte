import React, { useContext, useState } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import LocalMallIcon from "@material-ui/icons/LocalMall";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LogOut from "./accountForm/logOutButton"
import logo from "../logo.png"

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBarColor: {
  backgroundColor:" #ff8c00",
  background: "linear-gradient(62deg, #ff8c00 0%, #f7ce68 100%)",
  },
  loginButton: {
  padding: 5,
  textTransform: "uppercase",
    color: "#FF4500",
    fontWeight: "bold",
    fontSize: 10,
    marginRight: 50,
  },
  menuButton: {
    //  marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: "50%",
  },
  marginElem: {
    marginRight: 30,
  },
  marginIcons: {
    marginRight: 15,
    color: "black",
  },
  menuIconColor: {
    color: "black",
  },
  welcometext: {
    margin: "auto 10px",
    color: "white",
    fontWeight: 600,
    fontFamily: "Montserrat",
    fontStyle: "italic",
  
  },

  linkText: {
    textDecoration: "none",
    fontWeight: "bold",

    "&:hover": {
      color: "green",
    },
  },
   logOut: {
    fontFamily: "Montserrat",

    padding: 10,
    background: "rgb(2, 48, 32)",
     color: "white",
    borderRadius:"50%",
  }, 
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const loggedIn = localStorage.getItem("loggedIn")
  const usernameStorage = localStorage.getItem("usernameStorage")
 
  console.log("namenav",usernameStorage)
  console.log("nav",loggedIn)


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function twoFunction() {
    handleClose();
  }
console.log(logo)
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBarColor}>
        <Toolbar style={{ display: "flex", justifyContent: "space-around" }}>
          <div style={{display:"flex", justifyContent:"flex-start",padding:5}}>
            <img src={logo} alt="logo" className={classes.logo} />
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
          
            <MenuIcon className={classes.menuIconColor} />
            </IconButton>
            </div >
         {/*  {loggedIn && <p className={classes.welcometext}>Welcome <span>{usernameStorage}</span></p> }*/}
          

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem className={classes.menuIt} onClick={twoFunction}>
              <Link  className={classes.linkText} to="/petsLost">Lost Pets</Link>
            </MenuItem>
            <MenuItem className={classes.menuIt} onClick={twoFunction}>
              <Link className={classes.linkText} to="/petsFound">Found Pets</Link>
            </MenuItem>
            <MenuItem className={classes.menuIt} onClick={twoFunction}>
              <Link  className={classes.linkText}to="/Form">Pet registration</Link>
            </MenuItem>
          </Menu>

          { !loggedIn ? <Link to="/signUpForm"> <button className={classes.loginButton}>Sign in/up</button> </Link> :
         <div style={{display:"flex", flexDirection:"column"}}> <p className={classes.welcometext}>Welcome <span>{usernameStorage}</span></p><LogOut/> </div>}
        </Toolbar>
      </AppBar>
    </div>
  );
}
