import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
import Form from "./Form";

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

  function changeName(e) {
    setDeck({ ...deck, front: e.target.value });
  }

  function changeDesc(e) {
    setDeck({ ...deck, back: e.target.value });
  }

  return (
    <section className="container">
      <nav arial-label="breadcrumb">
        <ol className="breadcrumb">
          <li key="0" className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li key="1" className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li key="2" className="breadcrumb-item active" aria-current="page" s>
            Edit Deck
          </li>
        </ol>
      </nav>
      <h2>Edit Deck</h2>
      <Form
        handleSubmit={handleSubmit}
        deck={deck}
        changeName={changeName}
        changeDesc={changeDesc}
      />
    </section>
  );
}

export default EditDeck;
