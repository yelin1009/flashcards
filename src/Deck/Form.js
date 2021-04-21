import React from "react";
import { Link } from "react-router-dom";

function Form({ handleSubmit, deck = {}, changeName, changeDesc }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          id="deckName"
          placeholder="Deck Name"
          onChange={changeName}
          value={deck.name}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          className="form-control"
          id="description"
          placeholder="Brief description of the deck"
          rows="5"
          onChange={changeDesc}
          value={deck.description}
        />
      </div>
      <Link className="btn btn-secondary" to="/">
        Cancel
      </Link>
      <button type="submit" className="btn btn-primary" to="/">
        Submit
      </button>
    </form>
  );
}

export default Form;
