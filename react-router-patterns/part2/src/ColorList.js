import React from "react";
import { Link } from "react-router-dom";
import "./ColorList.css";

function ColorList({ colors }) {
  return (
    <div className="ColorList">
      <div className="ColorList-top">
        <h1>Welcome to the color factory.</h1>
        <Link to="/colors/new">Add a Color</Link>
      </div>
      
      <div className="ColorList-bottom">
        <h4>Please Select a color</h4>
        <ul>
          {colors.map(color => (
            <li key={color}>
              <Link to={`/colors/${color}`}>{color}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ColorList;
