import "./App.css";
import { Home, ProductPage, OrderPage, CategoryPage } from "./Pages";
import { Header } from "./component";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UiState from "./context/UiContext/UiState";

function App() {
  return (
    <Router>
      <UiState>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/products" component={ProductPage} />
            <Route path="/orders" component={OrderPage} />
            <Route path="/category" component={CategoryPage} />
          </Switch>
        </div>
      </UiState>
    </Router>
  );
}

export default App;
