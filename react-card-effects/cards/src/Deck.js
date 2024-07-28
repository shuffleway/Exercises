import React, { useEffect, useState, useCallback } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

function Deck() {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        setDeck(response.data);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    }
    fetchData();
  }, []);

  const drawCard = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);
      if (response.data.remaining === 0) throw new Error("Deck empty!");

      const card = response.data.cards[0];
      setDrawn(drawn => [
        ...drawn,
        {
          id: card.code,
          name: `${card.value} of ${card.suit}`,
          image: card.image,
        },
      ]);
    } catch (error) {
      alert(error);
    }
  }, [deck]);

  const shuffleDeck = useCallback(async () => {
    setIsShuffling(true);
    try {
      await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
      setDrawn([]);
    } catch (error) {
      alert(error);
    } finally {
      setIsShuffling(false);
    }
  }, [deck]);

  const renderDrawButton = () => (
    <button
      className="Deck-gimme"
      onClick={drawCard}
      disabled={isShuffling}
    >
      DRAW
    </button>
  );

  const renderShuffleButton = () => (
    <button
      className="Deck-gimme"
      onClick={shuffleDeck}
      disabled={isShuffling}
    >
      SHUFFLE DECK
    </button>
  );

  return (
    <main className="Deck">
      {deck && renderDrawButton()}
      {deck && renderShuffleButton()}
      <div className="Deck-cardarea">
        {drawn.map(card => (
          <Card key={card.id} name={card.name} image={card.image} />
        ))}
      </div>
    </main>
  );
}

export default Deck;
