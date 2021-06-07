import logo from "./logo.svg";
import "./App.css";
import "./styles/SignUpForm.css";
import Form from "./components/accountForm/Form";
import MenuAppBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <MenuAppBar />

      <Form />
    </div>
  );
}

export default App;
