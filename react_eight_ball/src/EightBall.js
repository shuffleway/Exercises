import React, { useState } from "react";
import "./EightBall.css";
import defaultAnswers from "./answers";

const EightBall = ({ answers = defaultAnswers }) => {
  const initialQuestion = {
    msg: "Think of a Question.",
    color: "black",
  };

  const [answer, setAnswer] = useState(initialQuestion);
  const [greenCount, setGreenCount] = useState(0);
  const [goldenrodCount, setGoldenrodCount] = useState(0);
  const [redCount, setRedCount] = useState(0);

  const handleClick = () => {
    let randomIndex = Math.floor(Math.random() * answers.length);
    let choice = answers[randomIndex];
    setAnswer(choice);

    switch (choice.color) {
      case "green":
        setGreenCount(greenCount + 1);
        break;
      case "goldenrod":
        setGoldenrodCount(goldenrodCount + 1);
        break;
      case "red":
        setRedCount(redCount + 1);
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setAnswer(initialQuestion);
    setGreenCount(0);
    setGoldenrodCount(0);
    setRedCount(0);
  };

  return (
    <div className="EightBall-container">
        <div className="EightBall" onClick={handleClick} style={{ backgroundColor: answer.color }}>
            <b>{answer.msg}</b>
        </div>

        <div className="EightBall-stats">
            <p>Green: {greenCount}</p>
            <p>Goldenrod: {goldenrodCount}</p>
            <p>Red: {redCount}</p>
        </div>
        
        <button className="EightBall-reset" onClick={handleReset}>
            Reset
        </button>

    </div>
  );
};

export default EightBall;
