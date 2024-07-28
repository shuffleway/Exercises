import React, { useEffect, useState, useRef } from "react";
import Card from "./Card";
import axios from "axios";
import "./Deck.css";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";

const useDeck = () => {
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
        setDeck(response.data);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };
    fetchDeck();
  }, []);

  return deck;
};

const useCardDrawing = (deck, isDrawing, setIsDrawing) => {
  const [drawn, setDrawn] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);
        if (response.data.remaining === 0) throw new Error("Deck empty!");

        const card = response.data.cards[0];
        setDrawn((drawn) => [
          ...drawn,
          {
            id: card.code,
            name: `${card.value} of ${card.suit}`,
            image: card.image,
          },
        ]);
      } catch (error) {
        setIsDrawing(false);
        alert(error);
      }
    };

    if (isDrawing && !timerRef.current) {
      timerRef.current = setInterval(fetchCard, 1000);
    } else if (!isDrawing && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => clearInterval(timerRef.current);
  }, [deck, isDrawing, setIsDrawing]);

  return [drawn, setDrawn];
};

const useDeckShuffling = (deck, isShuffling, setIsShuffling, setIsDrawing, setDrawn) => {
  useEffect(() => {
    const shuffleDeck = async () => {
      try {
        await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
        setDrawn([]);
        setIsDrawing(false);
        setIsShuffling(false);
      } catch (error) {
        alert(error);
      }
    };

    if (isShuffling && deck) {
      shuffleDeck();
    }
  }, [deck, isShuffling, setIsDrawing, setIsShuffling, setDrawn]);
};

function Deck() {
  const deck = useDeck();
  const [isDrawing, setIsDrawing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [drawn, setDrawn] = useCardDrawing(deck, isDrawing, setIsDrawing);

  useDeckShuffling(deck, isShuffling, setIsShuffling, setIsDrawing, setDrawn);

  const toggleDrawing = () => setIsDrawing((prev) => !prev);
  const startShuffling = () => setIsShuffling(true);

  return (
    <main className="Deck">
      {deck && (
        <>
          <button className="Deck-gimme" onClick={toggleDrawing} disabled={isShuffling}>
            {isDrawing ? "STOP" : "KEEP"} DRAWING FOR ME
          </button>
          <button className="Deck-gimme" onClick={startShuffling} disabled={isShuffling}>
            SHUFFLE DECK
          </button>
        </>
      )}
      <div className="Deck-cardarea">
        {drawn.map((card) => (
          <Card key={card.id} name={card.name} image={card.image} />
        ))}
      </div>
    </main>
  );
}

export default Deck;
