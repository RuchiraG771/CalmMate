import React, { useState } from "react";
import "./TextAnalysis.css";

export default function TextAnalysis() {

  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const analyzeMood = () => {

  const input = text.toLowerCase();

  const happyWords = ["happy","great","good","excited","wonderful","joy","love"];
  const sadWords = ["sad","lonely","tired","upset","cry","bad","depressed"];
  const stressWords = ["stress","pressure","overwhelmed","anxious","deadline","workload","worried"];

  let mood = "Neutral";
  let stressScore = 10;

  if(happyWords.some(word => input.includes(word))){
    mood = "Happy";
    stressScore = 15;
  }

  if(sadWords.some(word => input.includes(word))){
    mood = "Sad";
    stressScore = 40;
  }

  if(stressWords.some(word => input.includes(word))){
    mood = "Sad";
    stressScore = 70;
  }

  let stressLevel = "Low";

  if(stressScore > 60){
    stressLevel = "High";
  }
  else if(stressScore > 30){
    stressLevel = "Medium";
  }

  let suggestions = [];

if(stressLevel === "Low"){
  suggestions = [
    "🧘 Mindfulness Meditation",
    "🫁 Box Breathing (4-4-4-4)",
    "🎧 Listen to Nature Sounds",
    "🚶 Take a short relaxing walk"
  ];
}

if(stressLevel === "Medium"){
  suggestions = [
    "🧘 Guided Meditation",
    "🫁 4-7-8 Breathing Exercise",
    "🌧 Listen to Rain Sounds",
    "🧘‍♀️ Light Stretching or Yoga"
  ];
}

if(stressLevel === "High"){
  suggestions = [
    "🧘 Body Scan Meditation",
    "🫁 Alternate Nostril Breathing",
    "📵 Disconnect from work for 10 minutes",
    "💬 Talk to a trusted friend"
  ];
}
  setResult({
  stressDetected: stressScore > 40 ? "Yes" : "No",
  stressLevel,
  stressScore,
  mood,
  suggestions
});

};
  return (
    <div className="text-analysis-page">

      <h2>📝 Text Mood Analysis</h2>

      <p className="subtitle">
        Write your thoughts and CalmMate will analyze your emotional state.
      </p>

      <textarea
        placeholder="Write your thoughts here..."
        value={text}
        onChange={(e)=>setText(e.target.value)}
      />

      <button className="primary-btn" onClick={analyzeMood}>
        Analyze Mood
      </button>

      {result && (

        <div className="result-card">

          <h3>📊 Emotional Analysis Result</h3>

          <p><b>Stress Detected:</b> {result.stressDetected}</p>

          <p><b>Stress Level:</b> {result.stressLevel}</p>

          <p><b>Stress Score:</b> {result.stressScore}</p>

          <p>
<b>Mood Detected:</b>{" "}
{result.mood === "Happy" && "😊 Happy"}
{result.mood === "Sad" && "😢 Sad"}
{result.mood === "Neutral" && "😐 Neutral"}
</p>

          <h4>💡 Personalized Calm Suggestions</h4>

<ul>
  {result.suggestions.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>

        </div>

      )}

    </div>
  );
}