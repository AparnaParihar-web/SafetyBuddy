import React, { useState } from "react";

function Dashboard() {
  const [riskLevel, setRiskLevel] = useState("LOW");
  const [spokenText, setSpokenText] = useState("");
  const [listening, setListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const startListening = () => {
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setSpokenText(text);
      detectRisk(text);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const detectRisk = (text) => {
    const lower = text.toLowerCase();

    if (
      lower.includes("bachao") ||
      lower.includes("help me") ||
      lower.includes("mujhe bachao") ||
      lower.includes("danger") ||
      lower.includes("chor")
    ) {
      setRiskLevel("HIGH");
      sendAutoSMS();
    } else if (
      lower.includes("dar") ||
      lower.includes("scared") ||
      lower.includes("problem")
    ) {
      setRiskLevel("MEDIUM");
    } else {
      setRiskLevel("LOW");
    }
  };

  const sendAutoSMS = () => {
    const savedNumber = localStorage.getItem("savedContact");

    if (savedNumber) {
      alert("🚨 HIGH RISK!\nSMS sent to: " + savedNumber);
    } else {
      alert("⚠ No saved contact found!");
    }
  };

  const getRiskColor = () => {
    if (riskLevel === "HIGH") return "#dc2626";
    if (riskLevel === "MEDIUM") return "#facc15";
    return "#22c55e";
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📊 Safety Dashboard</h1>

      {/* Speak Now Button */}
      <button
        onClick={startListening}
        style={{
          ...styles.speakBtn,
          background: listening ? "#dc2626" : "#2563eb",
        }}
      >
        {listening ? "🎤 Listening..." : "🎤 Speak Now"}
      </button>

      {/* Risk Indicator */}
      <div
        style={{
          ...styles.riskBox,
          background: getRiskColor(),
          animation: riskLevel === "HIGH" ? "pulse 1s infinite" : "none",
        }}
      >
        Current Risk Level: {riskLevel}
      </div>

      {/* Spoken Text */}
      <p style={styles.voiceText}>
        Last Voice Input: {spokenText || "No speech detected"}
      </p>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    marginBottom: "30px",
  },
  speakBtn: {
    padding: "15px 40px",
    borderRadius: "40px",
    border: "none",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "30px",
    transition: "0.3s",
  },
  riskBox: {
    padding: "25px",
    borderRadius: "20px",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  voiceText: {
    fontSize: "16px",
    opacity: 0.8,
  },
};

export default Dashboard;