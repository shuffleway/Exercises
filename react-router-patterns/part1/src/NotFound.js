import React from 'react';
import { Link } from 'react-router-dom';
import "./NotFound.css"

function NotFound() {
  return (
    <div className='NotFound'>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/dogs">Go back</Link>
    </div>
  );
}

export default NotFound;
