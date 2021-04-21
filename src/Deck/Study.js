import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../utils/api/index";

function Study() {
  const [deck, setDeck] = useState([]);
  const [cards, setCard] = useState([]);
  const [cardNumber, setCardNumber] = useState(0);
  const [flip, setFlip] = useState("front");
  const [flipped, setFlipped] = useState(false);

  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadData() {
      const dataFromAPI = await readDeck(deckId);
      setDeck(dataFromAPI);
      setCard(dataFromAPI.cards);
    }

    loadData();
  }, [deckId]);

  function handleFlip() {
    if (flip === "front") {
      setFlip("back");
      setFlipped(true);
    } else if (flip === "back") {
      setFlip("front");
    }
  }

  function handleNext() {
    if (cardNumber + 1 < cards.length) {
      setCardNumber(cardNumber + 1);
      setFlip("front");
      setFlipped(false);
    } else {
      const result = window.confirm(
        "Restart cards? Click 'cancel' to return to the homepage."
      );
      if (result) {
        setCardNumber(0);
        setFlip("front");
        setFlipped(false);
      } else {
        history.push("/");
      }
    }
  }

  if (cards.length > 2) {
    return (
      <section className="container">
        <nav arial-label="breadcrumb">
          <ol className="breadcrumb">
            <li key="0" className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li key="1" className="breadcrumb-item">
              <Link to="/">{deck.name}</Link>
            </li>
            <li key="2" className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h2 className="mb-3">Study: {deck.name}</h2>
        <div className="card w-100">
          <div className="container">
            <div className="row">
              <h4>Card 1 of {cards.length}</h4>
            </div>

            <div className="card-body">{cards[cardNumber][flip]}</div>
            <button className="btn btn-secondary" onClick={handleFlip}>
              Flip
            </button>
            {flipped ? (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="container">
        <nav arial-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/">{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page" s>
              Study
            </li>
          </ol>
        </nav>
        <div>
          <h4>Not enough cards.</h4>
          <p>
            You need at least 3 cards to study. There are {cards.length} cards
            in this deck.
          </p>
          <Link to={`decks/${deck.id}/add`} className="btn btn-primary">
            Add Cards
          </Link>
        </div>
      </section>
    );
  }
}

export default Study;
