import logo from "./logo.svg";
import React from "react";
import "./App.css";
import "./styles/SignUpForm.css";
import Form from "./components/accountForm/Form";
import MenuAppBar from "./components/NavBar";
import PetsLost from "./views/PetsLost";
import PetsFound from "./views/PetsFound";
import FormPet from "./components/FormPet";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { VariablesContextProvider } from "./context/VariablesContext";

function App() {
  return (
    <div className="App">
      <Router>
        <VariablesContextProvider>
          <MenuAppBar />
          <FormPet />
          <Switch>
            <Route path="/petsLost" exact component={PetsLost} />
          </Switch>
          <Switch>
            <Route path="/petsFound" exact component={PetsFound} />
          </Switch>
        </VariablesContextProvider>
      </Router>
    </div>
  );
}

export default App;
