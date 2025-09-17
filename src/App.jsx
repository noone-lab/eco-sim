import React, { useState, useEffect } from "react";

export default function App() {
const [round, setRound] = useState(1);
const [situation, setSituation] = useState("");
const [yourAnswer, setYourAnswer] = useState("");
const [history, setHistory] = useState([]);
const [score, setScore] = useState(0);

useEffect(() => {
const savedHistory = JSON.parse(localStorage.getItem("ecoSimHistory")) || [];
const savedScore = JSON.parse(localStorage.getItem("ecoSimScore")) || 0;
setHistory(savedHistory);
setScore(savedScore);
}, []);

useEffect(() => {
localStorage.setItem("ecoSimHistory", JSON.stringify(history));
localStorage.setItem("ecoSimScore", JSON.stringify(score));
}, [history, score]);

const situations = [
"Plant native trees in the neighborhood.",
"Reduce single-use plastics at home.",
"Start a weekly bike-to-work day.",
"Organize a local river clean-up.",
"Compost kitchen scraps to cut landfill waste.",
];

function nextRound() {
const s = situations[(round - 1) % situations.length];
setSituation(s);
setYourAnswer("");
}

function submit() {
if (!yourAnswer.trim()) return;
const good = yourAnswer.toLowerCase().includes("plan")
|| yourAnswer.toLowerCase().includes("reduce")
|| yourAnswer.toLowerCase().includes("reuse")
|| yourAnswer.toLowerCase().includes("recycle")
|| yourAnswer.toLowerCase().includes("compost");
const delta = good ? 10 : 0;
const rec = { round, situation, yourAnswer, points: delta };
setHistory([rec, ...history]);
setScore(score + delta);
setRound(round + 1);
setSituation("");
setYourAnswer("");
}

return (
<div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 720, margin: "2rem auto", padding: "1rem" }}>
<h1>Eco Sim</h1>
{!situation ? (
<div>
<p>Round {round}</p>
<button onClick={nextRound}>Get situation</button>
</div>
) : (
<div>
<p style={{ fontWeight: 600 }}>{situation}</p>
<textarea
value={yourAnswer}
onChange={(e) => setYourAnswer(e.target.value)}
placeholder="Write a small plan to act on this."
rows={3}
style={{ width: "100%" }}
/>
<div style={{ marginTop: 8 }}>
<button onClick={submit}>Submit</button>
</div>
</div>
)}
<hr />
<p>Score: {score}</p>
<h3>History</h3>
<ul>
{history.map((h, i) => (
<li key={i}>
Round {h.round}: {h.situation} — “{h.yourAnswer}” (+{h.points})
</li>
))}
</ul>
</div>
);
}
