import logo from "./logo.svg";
import React from "react";
import "./App.css";
import "./styles/SignUpForm.css";
import Form from "./components/accountForm/Form";
import MenuAppBar from "./components/NavBar";
import PetsLost from "./views/PetsLost";
import PetsFound from "./views/PetsFound";
import FormPet from "./components/FormPet";
import SignUp from "./components/accountForm/SignUp"
import SignIn from "./components/accountForm/SignIn"
import GoogleMap from "./components/googleMaps/GoogleMap";
import Home from "./views/Home"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { VariablesContextProvider } from "./context/VariablesContext";
import ConvertedAddress from "./components/ConvertedAddress"
import SinglePet from "./views/SinglePet"

function App() {
  return (
    <div className="App">
      <Router>
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
               <Route path="/signInForm" exact component={SignIn} />
               <Route
                  exact
                  path="/details/:id">
                  <SinglePet />
                </Route>
          </Switch>
        </VariablesContextProvider>
      </Router>
    </div>
  );
}

export default App;
