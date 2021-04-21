import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api/index";

function AddCards() {
  const [deck, setDeck] = useState({ name: "", description: "" });
  const { deckId } = useParams();
  const initializeForm = {
    front: "",
    back: "",
    deckId,
  };
  const [card, setCard] = useState({ ...initializeForm });

  useEffect(() => {
    async function loadData() {
      const dataFromAPI = await readDeck(deckId);
      setDeck(dataFromAPI);
    }

    loadData();
  }, [deckId]);

  function handleSubmit(e) {
    e.preventDefault();
    async function updateData() {
      await createCard(deckId, card);
      setCard({ ...initializeForm });
    }
    updateData();
  }

  function changeFront(e) {
    setCard({ ...card, front: e.target.value });
  }

  function changeBack(e) {
    setCard({ ...card, back: e.target.value });
  }

  return (
    <section className="container">
      <nav arial-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link key="0" to="/">
              Home
            </Link>
          </li>
          <li key="1" className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li key="2" className="breadcrumb-item active" aria-current="page" s>
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Front</label>
          <textarea
            className="form-control"
            id="cardName"
            placeholder="Front side of card"
            onChange={changeFront}
            value={card.front}
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Back</label>
          <textarea
            className="form-control"
            id="cardDescription"
            placeholder="Back side of card"
            rows="3"
            onChange={changeBack}
            value={card.back}
          />
        </div>
        <Link to="/" className="btn btn-secondary">
          Done
        </Link>
        <button type="submit" className="btn btn-primary" to="/">
          Save
        </button>
      </form>
    </section>
  );
}

export default AddCards;
