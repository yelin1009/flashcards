import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";

function EditDeck() {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    async function loadData() {
      const dataFromAPI = await readDeck(deckId);
      setDeck(dataFromAPI);
    }

    loadData();
  }, [deckId]);

  function handleSubmit(e) {
    e.preventDefault();
    updateDeck(deck).then((output) => history.push(`/decks/${output.id}`));
  }

  function changeFront(e) {
    setDeck({ ...deck, front: e.target.value });
  }

  function changeBack(e) {
    setDeck({ ...deck, back: e.target.value });
  }

  return (
    <section className="container">
      <nav arial-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page" s>
            Edit Deck
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="deckName">Name</label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            placeholder={deck.name}
            onChange={changeFront}
            value={deck.name}
          />
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            placeholder={deck.description}
            rows="5"
            value={deck.description}
            onChange={changeBack}
          />
        </div>
        <Link to={`/decks/${deckId}`} className="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" className="btn btn-primary" to="/">
          Submit
        </button>
      </form>
    </section>
  );
}

export default EditDeck;
