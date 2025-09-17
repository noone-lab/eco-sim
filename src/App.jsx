import React, { useState, useEffect } from "react";

export default function App() {
  const [round, setRound] = useState(1);
  const [situation, setSituation] = useState("");
  const [yourAnswer, setYourAnswer] = useState("");
  const [history, setHistory] = useState([]);
  const [score, setScore] = useState(0);

  // Load history and score from localStorage on mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("ecoSimHistory")) || [];
    const savedScore = JSON.parse(localStorage.getItem("ecoSimScore")) || 0;
    setHistory(savedHistory);
    setScore(savedScore);
  }, []);

  // Save history and score whenever they change
  useEffect(() => {
    localStorage.setItem("ecoSimHistory", JSON.stringify(history));
    localStorage.setItem("ecoSimScore", JSON.stringify(score));
  }, [history, score]);

  const situations = [
    "The central bank increases interest rates.",
    "The price of oil rises sharply.",
    "Government increases spending on infrastructure.",
    "Stock market crashes suddenly.",
    "US dollar strengthens against other currencies.",
    "Global demand for gold increases."
  ];

  const getNewSituation = () => {
    const random = situations[Math.floor(Math.random() * situations.length)];
    setSituation(random);
    setYourAnswer("");
  };

  const submitAnswer = () => {
    if (!yourAnswer) return;
    const correct = Math.random() > 0.4; // fake correctness for now
    const newEntry = {
      round,
      situation,
      yourAnswer,
      result: correct ? "✅ Correct" : "❌ Partial/Incorrect"
    };
    setHistory([...history, newEntry]);
    if (correct) setScore(score + 1);
    setRound(round + 1);
    getNewSituation();
  };

  const resetGame = () => {
    setRound(1);
    setScore(0);
    setHistory([]);
    localStorage.removeItem("ecoSimHistory");
    localStorage.removeItem("ecoSimScore");
    getNewSituation();
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>🌍 Economy Simulation Game</h1>
      <p>Round: {round}</p>
      <p>Score: {score}</p>

      {situation ? (
        <>
          <h2>Situation:</h2>
          <p><b>{situation}</b></p>

          <textarea
            value={yourAnswer}
            onChange={(e) => setYourAnswer(e.target.value)}
            placeholder="Type your response here..."
            rows={4}
            cols={50}
          />
          <br />
          <button onClick={submitAnswer}>Submit Answer</button>
        </>
      ) : (
        <button onClick={getNewSituation}>Start Game</button>
      )}

      <hr />
      <h3>📜 History</h3>
      {history.length === 0 && <p>No rounds yet.</p>}
      <ul>
        {history.map((h, i) => (
          <li key={i}>
            <b>Round {h.round}:</b> {h.situation} <br />
            <i>Your Answer:</i> {h.yourAnswer} <br />
            <span>{h.result}</span>
          </li>
        ))}
      </ul>

      <button onClick={resetGame} style={{ marginTop: "20px" }}>
        🔄 Reset Game
      </button>
    </div>
  );
}
