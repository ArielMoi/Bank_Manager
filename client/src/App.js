import Nav from "./Components/Nav/Nav.Component";
import Form from './Components/Form/Form.Component'
import DetailsNav from "./Components/DetailsNav/DetailsNav.Component";
import Details from './Pages/Details/Details'
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Nav /> */}
        {/* <DetailsNav /> */}
        {/* <Route path="/" exact component={Form} /> */}
        <Route path="/details" exact component={Details} />
        <Details />
      </BrowserRouter>
    </div>
  );
}

export default App;
