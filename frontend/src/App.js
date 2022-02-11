import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListProduct from "./components/ListProduct";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Router>
      <div className="container">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <Switch>
              <Route exact path="/">
                <Navbar />
                <ListProduct />
              </Route>
              <Route exact path="/addProduct">
                <Navbar />
                <AddProduct />
              </Route>
              <Route exact path="/editProduct/:id">
                <Navbar />
                <EditProduct />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
