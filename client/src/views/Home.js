import React from 'react'
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import "../styles/style.css"
const useStyles = makeStyles({

  blockDiv: {
        height: "210px",
        boxShadow: "5px 5px 15px -2px #000000",
      marginBottom:10,
        width: "100vw",
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: 'Zilla Slab',
        fontWeight: 900,
        fontSize: 20,
            "&:hover":{
          opacity:0.7
      }
    },
    linksStyle: {
        textDecoration: "none",
        cursor: "pointer"
    },
    greyColor: {
      background:"grey"

    }
});

const Home = () => {
  const classes = useStyles();
    return (<div style={{ marginTop: 57 }}>
      <Link className={classes.linksStyle} to="/petsLost" ><div style={{ backgroundColor: "#7fffd4" }} className={classes.blockDiv} >
            <h2 style={{color:"black"}}>LostPets</h2>
            <p style={{color:"black", maxWidth:"90%"}}>Has your beloved animal disappeared?
Register his profile in the app and let the FindMyPet community help you bring him home.</p>
        </div></Link> 
     <Link className={classes.linksStyle} to="/petsFound">  <div style={{backgroundColor:"grey"}} className={classes.blockDiv}><h2 style={{color:"white"}}>Spotted Pets</h2>
        <p style={{color:"white", maxWidth:"90%"}}>Have you seen a lost animal in the street? Write a post to help it</p></div></Link> 
       <Link className={classes.linksStyle} to="/inSave"> <div style={{ backgroundColor: "#FFC0CB",marginBottom:"12vh" }} className={classes.blockDiv}><h2>Back at home</h2>
        <p style={{ maxWidth:"90%"}}>We believe in stories with happy endings. They have been found and are safe at home.</p></div></Link>
    </div>)
    
}
export default Home;