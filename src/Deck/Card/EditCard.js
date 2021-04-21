import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readCard, updateCard } from "../../utils/api/index";

function EditCard() {
  const { cardId } = useParams();
  const history = useHistory();
  const [card, setCard] = useState({});

  //load cards from API to determine new card ID
  useEffect(() => {
    async function loadCard() {
      //get cards from API
      const loadedCard = await readCard(cardId);
      //set card id at + 1 length of current card array
      setCard(loadedCard);
    }
    loadCard();
  }, [cardId]);

  //update the state as card info changes
  function changeFront(e) {
    setCard({ ...card, front: e.target.value });
  }
  function changeBack(e) {
    setCard({ ...card, back: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateCard(card).then((output) => history.push(`/decks/${output.id}`));
  }

  return (
    <section className="container">
      <nav arial-label="breadcrumb">
        <ol className="breadcrumb">
          <li key="0" className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" key="2" aria-current="page">
            Edit Card
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Front</label>
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
          <label>Back</label>
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
