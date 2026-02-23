import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/icons/logo.png";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/login"); // after 3 sec go to main page
    }, 3000);
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <img src={logo} alt="Safety Buddy Logo" style={styles.logo} />

        <h1 style={styles.title}>Safety Buddy</h1>
        <p style={styles.subtitle}>Your Personal Emergency Assistant 🚨</p>

        <div style={styles.loader}></div>
        <p style={styles.loadingText}>Loading...</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a, #0f172a)",
    fontFamily: "Arial",
  },

  content: {
    textAlign: "center",
    animation: "fadeIn 2s ease-in-out",
  },

  logo: {
    width: "130px",
    height: "130px",
    borderRadius: "20px",
    marginBottom: "20px",
    boxShadow: "0px 8px 25px rgba(0,0,0,0.6)",
    animation: "zoomIn 2s ease-in-out",
  },

  title: {
    fontSize: "48px",
    fontWeight: "bold",
    color: "#38bdf8",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    color: "#e2e8f0",
    marginBottom: "40px",
  },

  loader: {
    margin: "auto",
    width: "60px",
    height: "60px",
    border: "6px solid rgba(255,255,255,0.2)",
    borderTop: "6px solid #38bdf8",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  loadingText: {
    marginTop: "15px",
    fontSize: "16px",
    color: "#cbd5e1",
  },
};

export default SplashScreen;