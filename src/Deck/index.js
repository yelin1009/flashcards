import React from "react";
import { Switch, Route } from "react-router-dom";
import Study from "./Study";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import Cards from "./Card/index";

function Decks() {
  return (
    <div>
      <Switch>
        <Route path="/decks/:deckId/study">
          <Study />
        </Route>
        <Route path="/decks/new">
          <CreateDeck />
        </Route>
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        <Route path="/decks/:deckId/cards">
          <Cards />
        </Route>
        <Route path="/decks/:deckId">
          <Deck />
        </Route>
      </Switch>
    </div>
  );
}

export default Decks;
