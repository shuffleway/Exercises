import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import "./Snack.css"

function Chips() {
  return (
    <div className="snack">
      <h1>Chips</h1>
      <img src="https://cdn.dribbble.com/users/153781/screenshots/2517980/media/84590da7850f75a3361ffbb4c7ff436b.gif" alt="Chips" />
      <p>These are some crunchy chips.</p>
      <Link to="/">Back to Vending Machine</Link>
    </div>
  );
}

export default Chips;
