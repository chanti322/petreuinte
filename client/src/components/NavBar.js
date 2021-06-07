import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
    background: " rgb(255,255,255)",
    background:
      "linear-gradient(90deg, rgba(255,255,255,1) 2%, rgba(39,161,45,1) 19%, rgba(25,78,34,1) 100%)",
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
        <Toolbar>
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
              Home
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
