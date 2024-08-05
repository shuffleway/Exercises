import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Sardines() {
  return (
    <div className="snack">
      <h1>Sardines</h1>
      <img src="https://64.media.tumblr.com/65e5b27f0b1a4c4c7a0cd7dfc48e3a43/cd5aec85d91b4e9e-c6/s500x750/26489cf73c704da12ab27fe2b9cd8d5a2ce5b639.gif" alt="Sardines" />
      <p>These are some tasty sardines.</p>
      <Link to="/">Back to Vending Machine</Link>
    </div>
  );
}

export default Sardines;
