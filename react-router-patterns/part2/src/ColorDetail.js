import React from "react";
import { useParams, Link } from "react-router-dom";
import "./ColorDetail.css";

function ColorDetail() {
  const params = useParams();
  const color = params.color;

  return (
    <div className="ColorDetail" style={{ backgroundColor: color }}>
      <div className="ColorDetail-content">
        <p>THIS IS {color}.</p>
        <p>ISN'T IT BEAUTIFUL?</p>
        <Link to="/colors">Go back</Link>
      </div>
    </div>
  );
}

export default ColorDetail;
