import React, { useState, useEffect } from "react";
import { updateCard, readCard, readDeck } from "../../utils/api/index";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router";

function EditCard() {
  //set up hooks
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const history = useHistory();
  const [card, setCard] = useState({
    front: "",
    back: "",
  });

  //load cards from API to determine new card ID
  useEffect(() => {
    async function loadDeck() {
      //get name from current deck
      const deck = await readDeck(deckId);
      setDeck(deck);
    }
    loadCard();
    loadDeck();
    async function loadCard() {
      //get cards from API
      const loadedCard = await readCard(cardId);
      //set card id at + 1 length of current card array
      setCard({
        front: loadedCard.front,
        back: loadedCard.back,
      });
    }
  }, [deckId, cardId]);

  //update the state as card info changes
  function changeFront(e) {
    setCard({ ...card, front: e.target.value });
  }
  function changeBack(e) {
    setCard({ ...card, back: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();
    updateCard(card).then((output) => history.push(`/decks/${output.deckId}`));
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
            Edit Card
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
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

export default EditCard;
