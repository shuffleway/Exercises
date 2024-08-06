import React from "react";
import "./DogDetails.css"
import { useParams, Navigate, Link } from "react-router-dom";

const DogDetails = ({dogs}) => {
    const { name } = useParams();
    const dog = dogs.find(dog => dog.name.toLowerCase() === name.toLowerCase());
  
    if (!dog) {
      return <Navigate to="/not-found" />;
    }

   return (
    <div className="DogDetails">
        <h1>{dog.name}</h1>
        <img src={dog.src} alt={dog.name} />
        <p>Age: {dog.age}</p>
        <ul>
        {dog.facts.map((fact, index) => (
            <li key={index}>{fact}</li>
        ))}
        </ul>
        <Link to="/dogs">Go back</Link>
     </div>
 );
   
}

export default DogDetails;