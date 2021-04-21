import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Decks from "../Deck/index";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";

function Layout() {
  return (
    <div>
      <Header />
      <div>
        <Switch>
          <Route exact={true} path="/">
            <Home />
          </Route>
          <Route path="/decks">
            <Decks />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
