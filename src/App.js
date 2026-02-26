import React, { useState } from "react";
import questions from "./data";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return; // prevent multiple clicks

    setSelectedOption(option);
    setShowAnswer(true);

    if (option === questions[current].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowAnswer(false);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setPage("result");
    }
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelectedOption(null);
    setShowAnswer(false);
    setPage("home");
  };

  return (
    <div className="container">

      {page === "home" && (
        <>
          <h1>Deployment Quiz App</h1>
          <button onClick={() => setPage("quiz")}>Start Quiz</button>
        </>
      )}

      {page === "quiz" && (
        <>
          <h2>Question {current + 1}</h2>
          <p>{questions[current].question}</p>

          {questions[current].options.map((opt, index) => {
            let className = "option-btn";

            if (showAnswer) {
              if (opt === questions[current].answer) {
                className += " correct";
              } else if (opt === selectedOption) {
                className += " wrong";
              }
            }

            return (
              <button
                key={index}
                className={className}
                onClick={() => handleOptionClick(opt)}
                disabled={selectedOption !== null}
              >
                {opt}
              </button>
            );
          })}

          <br />
          {selectedOption && (
            <button onClick={handleNext}>Next</button>
          )}
        </>
      )}

      {page === "result" && (
        <>
          <h2>Quiz Completed</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </>
      )}

    </div>
  );
}

export default App;