import React from 'react';
import "./DogList.css"
import { Link } from 'react-router-dom';

function DogList({ dogs }) {
  return (
    <div className='DogList'>
       <h1>Dog List</h1>
       <ul>
       {dogs.map(dog => (
          <li key={dog.name}>
              <Link to={`/dogs/${dog.name}`}>{dog.name}</Link>
          </li>
       ))}
       </ul>
    </div>
  );
}

export default DogList;
