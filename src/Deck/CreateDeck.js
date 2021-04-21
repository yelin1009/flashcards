import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";

function CreateDeck() {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    createDeck(deck);
  }

  function changeName(e) {
    setDeck({ ...deck, name: e.target.value });
  }

  function changeDesc(e) {
    setDeck({ ...deck, description: e.target.value });
  }

  return (
    <section className="container">
      <nav arial-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page" s>
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="deckName">Name</label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            placeholder="Deck Name"
            onChange={changeName}
            value={deck.name}
          />
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder="Brief description of the deck"
            rows="5"
            onChange={changeDesc}
            value={deck.description}
          />
        </div>
        <Link className="btn btn-secondary">Cancel</Link>
        <button type="submit" className="btn btn-primary" to="/">
          Submit
        </button>
      </form>
    </section>
  );
}

export default CreateDeck;
