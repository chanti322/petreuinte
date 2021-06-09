import logo from "./logo.svg";
import React from "react";
import "./App.css";
import "./styles/SignUpForm.css";
import Form from "./components/accountForm/Form";
import MenuAppBar from "./components/NavBar";
import PetsLost from "./views/PetsLost";
import FormPet from "./components/FormPet";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <MenuAppBar />
        <FormPet />
        <Switch>
          <Route path="/petsLost" exact component={PetsLost} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
