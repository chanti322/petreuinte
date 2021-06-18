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
    fontWeight:"bold",
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
    borderRadius: 5,
    padding: 5,
    background: "rgb(2, 48, 32)",
    color: "white",
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function twoFunction() {
    handleClose();
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBarColor}>
        <Toolbar style={{display:"flex", justifyContent:"space-between"}}>
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

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem className={classes.menuIt} onClick={twoFunction}>
              <Link to="/petsLost">Lost Pets</Link>
            </MenuItem>
            <MenuItem className={classes.menuIt} onClick={twoFunction}>
              <Link to="/petsFound">Found Pets</Link>
            </MenuItem>
            <MenuItem className={classes.menuIt} onClick={twoFunction}>
              <Link to="/Form">Pet registration</Link>
            </MenuItem>
          </Menu>
          <Link to="/signUpForm"> <button className={classes.loginButton}>Sign in/up</button> </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
