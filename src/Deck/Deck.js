import React, { useState, useEffect } from "react";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import { useParams, useHistory, Link } from "react-router-dom";

function Deck() {
  const [deck, setDeck] = useState({ id: 0, name: "", cards: [] });
  const params = useParams();
  const deckId = params.deckId;
  const history = useHistory();

  //useEffect to fetch card data
  useEffect(() => {
    async function loadData() {
      const dataFromAPI = await readDeck(deckId);
      setDeck(dataFromAPI);
    }
    loadData();
  }, [deckId]);

  //DeleteHandler for Deck
  function deleteDeckHandler(deckId) {
    if (window.confirm("Delete this deck? This can not be undone.")) {
      deleteDeck(deckId);
      history.push("/");
    }
  }

  //DeleteHandler for Cards
  function deleteCardHandler(cardId) {
    if (window.confirm("Delete Card? This can not be undone.")) {
      deleteCard(cardId).then((output) => history.go(0));
    }
  }

  return (
    <section className="container">
      <nav arial-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page" s>
            Deck
          </li>
        </ol>
      </nav>
      <div className="card w-100">
        <div className="container mt-0">
          <div className="row card-header">
            <div className="col-10 ">
              <h4 className="card-title">{deck.name}</h4>
            </div>
          </div>
          <div className="card-body mt-0">
            <p>{deck.description}</p>
          </div>
          <div className="container mt-0">
            <div className="row justify-content-between">
              <div className="col-8">
                <Link
                  to={`/decks/${deck.id}/edit`}
                  className="btn btn-secondary m-2"
                >
                  Edit
                </Link>
                <Link
                  to={`/decks/${deck.id}/study`}
                  className="btn btn-primary m-2"
                >
                  Study
                </Link>
                <Link
                  to={`/decks/${deck.id}/cards/new`}
                  className="btn btn-primary m-2"
                >
                  Add Cards
                </Link>
              </div>
              <div className="col-2">
                <button
                  className="btn btn-danger"
                  onClick={deleteDeckHandler}
                  value={deck.id}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h2>Cards</h2>
      {deck.cards.map((card) => (
        <div className="card w-100">
          <div className="container mt-0">
            <div className="row">
              <div className="card-text w-40">{card.front}</div>
              <hr />
              <div classname="card-text w-40">{card.back}</div>
            </div>
            <Link
              to={`/decks/${deck.id}/cards/${card.id}/edit`}
              className="btn btn-secondary m-2"
            >
              Edit
            </Link>
            <button
              className="btn btn-danger m-2"
              value={card.id}
              onClick={deleteCardHandler}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Deck;
