import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import { Link } from "react-router-dom";

function DeckList() {
  // Use useEffect to loadData
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      try {
        const output = await listDecks();
        setDecks(output);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadDecks();
  }, []);

  //DeleteHandler
  const handleDelete = async ({ target }) => {
    const value = target.value;
    const result = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (result) {
      async function deleteData() {
        try {
          await deleteDeck(value);
          const output = await listDecks();
          setDecks(output);
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Aborted");
          } else {
            throw error;
          }
        }
      }
      deleteData();
    }
  };

  if (decks.length > 0) {
    return (
      <section className="container">
        <div>
          <Link to="/decks/new" className="btn btn-lg btn-secondary">
            Create Deck
          </Link>
        </div>
        <br></br>
        {decks.map((deck) => (
          <div key={deck.id} className="card w-100">
            <div className="container mt-0">
              <div className="row card-header">
                <div className="col-10 ">
                  <h4 className="card-title">{deck.name}</h4>
                </div>
                <div className="col-2">
                  <p>{deck.cards.length} cards</p>
                </div>
              </div>
              <div className="card-body mt-0">
                <p>{deck.description}</p>
              </div>
              <div className="container mt-0">
                <div className="row justify-content-between">
                  <div className="col-4">
                    <Link to={`decks/${deck.id}`} className="btn btn-secondary">
                      View
                    </Link>
                    <Link
                      to={`decks/${deck.id}/study`}
                      className="btn btn-primary"
                    >
                      Study
                    </Link>
                  </div>
                  <div className="col-2">
                    <button
                      className="btn btn-danger"
                      value={deck.id}
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  } else {
    return <h2>"Create a new deck"</h2>;
  }
}

export default DeckList;
