import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddColor.css";

const AddColor = ({ addNewColor }) => {
  const [colorName, setColorName] = useState("");
  const [colorValue, setColorValue] = useState("#ffffff");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setColorName(e.target.value);
  };

  const handleValueChange = (e) => {
    setColorValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewColor({ name: colorName, value: colorValue });
    navigate("/colors");
  };

  return (
    <div className="AddColor">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="color-name">Color Name: </label>
          <input
            id="color-name"
            type="text"
            name="color-name"
            value={colorName}
            placeholder="Color name"
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="color-value">Color Value: </label>
          <input
            id="color-value"
            type="color"
            name="color-value"
            value={colorValue}
            onChange={handleValueChange}
          />
        </div>
        <button type="submit">Add this Color</button>
      </form>
    </div>
  );
};

export default AddColor;
