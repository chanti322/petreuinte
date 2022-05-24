import React from "react";
import "./App.css";
import "./styles/SignUpForm.css";
import MenuAppBar from "./components/NavBar";
import PetsLost from "./views/PetsLost";
import PetsFound from "./views/PetsFound";
import FormPet from "./components/FormPet";
import SignUp from "./components/accountForm/SignUp";
import SignIn from "./components/accountForm/SignIn";
import GoogleMap from "./components/googleMaps/GoogleMap";
import Home from "./views/Home";
import InSavePet from "./views/InSavePets";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { VariablesContextProvider } from "./context/VariablesContext";
import { AuthContextProvider } from "./context/AuthContext";
import ConvertedAddress from "./components/ConvertedAddress";
import SinglePet from "./views/SinglePet";
import Footer from "./components/Footer";
import SignUpSuccess from "./components/accountForm/SignUpSuccess";
import UserProfile from "./views/UserProfile";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appContainer: {
    width: "fit-content",
    maxWidth: 360,
    margin:"0 auto",
    [theme.breakpoints.up(600)]: {
      maxWidth: "100%",
      width: "100%",
    },
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.appContainer}>
      <Router>
        <AuthContextProvider>
          <VariablesContextProvider>
            <MenuAppBar />

            <ConvertedAddress />
            <Switch>
              <Route path="/petsLost" exact component={PetsLost} />
            </Switch>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/petsFound" exact component={PetsFound} />
              <Route path="/googleMap" exact component={GoogleMap} />
              <Route path="/Form" exact component={FormPet} />
              <Route path="/signUpForm" exact component={SignUp} />
              <Route path="/inSave" exact component={InSavePet} />
              <Route path="/signInForm" exact component={SignIn} />
              <Route path="/signUpSuccess" exact component={SignUpSuccess} />
              <Route path="/userProfile" exact component={UserProfile} />
              <Route exact path="/details/:id">
                <SinglePet />
              </Route>
            </Switch>
            <Footer />
          </VariablesContextProvider>
        </AuthContextProvider>
      </Router>
    </div>
  );
}

export default App;
