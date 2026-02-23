import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function OneTap() {
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(null);
  const [status, setStatus] = useState("idle");
  const [location, setLocation] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Start Emergency
  const handleEmergency = () => {
    setCountdown(3);
    setStatus("countdown");
  };

  // Countdown Logic
  useEffect(() => {
    if (countdown === 0) {
      sendEmergency();
      return;
    }

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Cancel Emergency
  const cancelEmergency = () => {
    setCountdown(null);
    setStatus("idle");
  };

  // Send Emergency
  const sendEmergency = () => {
    setStatus("sending");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setStatus("success");
        },
        () => {
          setStatus("success");
        }
      );
    } else {
      setStatus("success");
    }
  };

  // 🎙️ Start Recording
  const startRecording = async () => {
    if (!navigator.mediaDevices) {
      alert("Recording not supported in this browser");
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  // 🎙️ Stop Recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚨 One Tap Emergency</h1>

      {status === "idle" && (
        <button style={styles.emergencyBtn} onClick={handleEmergency}>
          🔴 ACTIVATE EMERGENCY
        </button>
      )}

      {status === "countdown" && (
        <div>
          <h2 style={styles.countdown}>Sending in {countdown}...</h2>
          <button style={styles.cancelBtn} onClick={cancelEmergency}>
            ❌ Cancel
          </button>
        </div>
      )}

      {status === "sending" && (
        <h2 style={styles.sending}>📡 Fetching Location...</h2>
      )}

      {status === "success" && (
        <div style={styles.successBox}>
          <h2>✅ Emergency Alert Sent!</h2>
          {location && (
            <p>
              📍 Location: {location.lat.toFixed(4)} ,{" "}
              {location.lng.toFixed(4)}
            </p>
          )}

          {/* 🎙️ Recording Section */}
          <div style={{ marginTop: "20px" }}>
            {!recording ? (
              <button style={styles.recordBtn} onClick={startRecording}>
                🎙️ Start Voice Recording
              </button>
            ) : (
              <button style={styles.stopBtn} onClick={stopRecording}>
                ⏹ Stop Recording
              </button>
            )}

            {audioURL && (
              <div style={{ marginTop: "15px" }}>
                <audio controls src={audioURL}></audio>
              </div>
            )}
          </div>
        </div>
      )}

      <button style={styles.backBtn} onClick={() => navigate("/")}>
        🔙 Back to Main Page
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #7f1d1d, #dc2626)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontFamily: "Arial",
    textAlign: "center",
    padding: "20px",
  },

  title: {
    fontSize: "36px",
    marginBottom: "30px",
  },

  emergencyBtn: {
    padding: "18px 35px",
    fontSize: "18px",
    background: "#ff0000",
    border: "none",
    borderRadius: "12px",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 0 25px rgba(255,0,0,0.8)",
  },

  countdown: {
    fontSize: "28px",
    marginBottom: "15px",
  },

  cancelBtn: {
    padding: "10px 20px",
    background: "#333",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },

  sending: {
    fontSize: "22px",
  },

  successBox: {
    background: "rgba(0,0,0,0.3)",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px",
  },

  recordBtn: {
    padding: "10px 20px",
    background: "#2563eb",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },

  stopBtn: {
    padding: "10px 20px",
    background: "#000",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },

  backBtn: {
    marginTop: "30px",
    padding: "10px 25px",
    background: "#1e3a8a",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
  },
};

export default OneTap;