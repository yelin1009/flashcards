import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api/index";

function AddCards() {
  //set up hooks
  const { deckId } = useParams();
  //create initial form state
  const initializeForm = {
    front: "",
    back: "",
    deckId,
  };
  const [card, setCard] = useState({ ...initializeForm });
  const [deck, setDeck] = useState({});
  const history = useHistory();

  //load cards from API to determine new card ID
  useEffect(() => {
    async function loadDeck() {
      //get name from current deck
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  //update the state as card info changes
  function changeFront(e) {
    setCard({ ...card, front: e.target.value });
  }
  function changeBack(e) {
    setCard({ ...card, back: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();
    async function updateData() {
      await createCard(deckId, card);
      setCard({ ...initializeForm });
    }
    updateData();
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
          <li key="2" className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <form onSubmit={submitHandler}>
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
        <button
          type="button"
          onClick={() => history.go(-1)}
          className="btn btn-secondary"
        >
          Done
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </section>
  );
}

export default AddCards;
