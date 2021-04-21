import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readCard, updateCard, readDeck } from "../../utils/api/index";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});

  useEffect(() => {
    async function loadData() {
      try {
        const dataFromAPI = await readDeck(deckId);
        setDeck(dataFromAPI);
        const datafromApi2 = await readCard(cardId);
        setCard(datafromApi2);
      } catch (error) {
        if (error.name === "AbortError") {
          // Ignore `AbortError`
          console.log("Aborted");
        } else {
          throw error;
        }
      }
    }
    loadData();
  }, [deckId, cardId]);

  function changeFront(e) {
    setCard({ ...card, front: e.target.value });
  }

  function changeBack(e) {
    setCard({ ...card, back: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateCard(card).then((output) => history.push(`/decks/${output.deckId}`));
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
          <li className="breadcrumb-item active" key="2" aria-current="page" s>
            Edit Card
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="deckName">Front</label>
          <textarea
            className="form-control"
            id="cardName"
            placeholder={card.front}
            onChange={changeFront}
            value={card.front}
            rows="3"
          />
        </div>
        <div className="form-group">
          <label for="description">Back</label>
          <textarea
            className="form-control"
            id="cardDescription"
            placeholder={card.back}
            rows="3"
            onChange={changeBack}
            value={card.back}
          />
        </div>
        <Link to="/" className="btn btn-secondary">
          Done
        </Link>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </section>
  );
}

export default EditCard;
