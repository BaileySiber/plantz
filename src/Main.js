import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import GreenHouse from "./GreenHouse";

// The Main component acts as the router, rendering the
// appropriate component depending on the route
const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/greenhouse" component={GreenHouse} />
    </Switch>
  </main>
);

export default Main;
