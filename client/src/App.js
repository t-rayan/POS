import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductScreen from "./screens/ProductScreen";
import OrderScreen from "./screens/OrderScreen";
import CategoryScreen from "./screens/CategoryScreen";
import CategoryDetailsScreen from "./screens/CategoryDetailsScreen";
import ProductDetailsScreen from "./screens/ProductDetailsScreen";
import OrderDetailsScreen from "./screens/OrderDetailsScreen";
import AuthScreens from "./screens/AuthScreens";
import PrivateRoute from "./PrivateRoute";
import ShopScreen from "./screens/ShopScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AddCategoryScreen from "./screens/AddCategoryScreen";
import AddProductScreen from "./screens/AddProductScreen";

function App(props) {
  return (
    <Router>
      <div className="grid-container">
        <header>
          <Navbar />
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={AuthScreens} />
            <PrivateRoute path="/shop" exact component={ShopScreen} />
            {/* <Route path="/login" exact component={AuthScreens} /> */}
            <PrivateRoute path="/categories" exact component={CategoryScreen} />
            <PrivateRoute
              path="/addCategory"
              exact
              component={AddCategoryScreen}
            />
            <PrivateRoute path="/products" exact component={ProductScreen} />
            <PrivateRoute
              path="/addProduct"
              exact
              component={AddProductScreen}
            />
            <PrivateRoute path="/orders" exact component={OrderScreen} />
            <PrivateRoute path="/orders/:id" component={OrderDetailsScreen} />
            <PrivateRoute
              path="/categories/:id"
              component={CategoryDetailsScreen}
            />
            <PrivateRoute
              path="/products/:id"
              component={ProductDetailsScreen}
            />
            <PrivateRoute path="/dashboard" exact component={DashboardScreen} />
            <PrivateRoute path="/settings" exact component={SettingsScreen} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
