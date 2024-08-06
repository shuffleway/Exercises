import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ColorList from "./ColorList";
import ColorDetail from "./ColorDetail";
import AddColor from "./AddColor";
import "./App.css";

function App() {
  const initialColors = JSON.parse(localStorage.getItem('colors')) || ["red", "green", "blue"];
  const [colors, setColors] = useState(initialColors);

  useEffect(() => {
    localStorage.setItem('colors', JSON.stringify(colors));
  }, [colors]);

  const addNewColor = (newColor) => {
    setColors([...colors, newColor.name]);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/colors" element={<ColorList colors={colors} />} />
        <Route path="/colors/new" element={<AddColor addNewColor={addNewColor} />} />
        <Route path="/colors/:color" element={<ColorDetail />} />
      </Routes>
    </div>
  );
}

export default App;
