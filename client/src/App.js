import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage.jsx";
import Videogames from "./Components/Videogames/Videogames.jsx";
import Detail from "./Components/Detail/Detail.jsx";
import Form from "./Components/Form/Form.jsx";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001"; 

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/home">
          <Videogames />
        </Route>
        <Route path="/detail/:detailId">
          <Detail />
        </Route>
        <Route path="/form">
          <Form />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
