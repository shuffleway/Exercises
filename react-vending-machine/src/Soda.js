import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

function Soda() {
  return (
    <div className="snack">
      <h1>Soda</h1>
      <img src="https://media2.giphy.com/media/l41lROcZLoYlRVdZu/giphy.gif" alt="Soda" />
      <p>This is a refreshing soda.</p>
      <Link to="/">Back to Vending Machine</Link>
    </div>
  );
}

export default Soda;
