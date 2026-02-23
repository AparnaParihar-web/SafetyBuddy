import React, { useEffect, useState } from "react";
import aboutIcon from "./assets/icons/about.png";
import logoIcon from "./assets/icons/logo.png";

function About() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 200);
  }, []);

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <img src={logoIcon} alt="logo" style={styles.logo} />
        <h1 style={styles.title}>About Safety Buddy</h1>
      </div>

      <p style={styles.subtitle}>
        Your Personal Emergency Assistant 🚨
      </p>

      {/* MAIN CARD */}
      <div style={animate ? styles.cardActive : styles.card}>
        <img src={aboutIcon} alt="about" style={styles.aboutIcon} />

        <h2 style={styles.heading}>What is Safety Buddy?</h2>

        <p style={styles.text}>
          <b>Safety Buddy</b> is an emergency response web application designed
          to help people during dangerous situations. It provides quick SOS
          features, live location sharing, emergency contacts, and rescue
          assistance.
        </p>

        <h2 style={styles.heading}>Why Safety Buddy?</h2>

        <p style={styles.text}>
          In emergency situations, every second matters. Safety Buddy is built to
          give fast access to help using just one click or one action.
        </p>

        {/* FEATURES */}
        <h2 style={styles.heading}>Main Features</h2>

        <div style={styles.featureBox}>
          <Feature text="🚨 One Tap Emergency Alert" />
          <Feature text="📍 Live Location Sharing" />
          <Feature text="📩 SOS Message to 3 Saved Contacts" />
          <Feature text="📱 Shake Detection Trigger" />
          <Feature text="🎙️ Voice Trigger (Help / Bachao / Ambulance)" />
          <Feature text="🏥 Nearby Hospital, Pharmacy & Police Station" />
          <Feature text="🟢 Safe Arrival Start/Stop System" />
        </div>

        {/* DEVELOPER */}
        <div style={styles.devBox}>
          <h3 style={styles.devTitle}>👨‍💻 Developed By</h3>
          <p style={styles.devText}>
            <b>Abhishek Kumar</b> <br />
            <b>Aparna Parihar</b> <br/>
             Uttaranchal University <br />
            Safety Buddy Project
          </p>
        </div>

        <p style={styles.footer}>
          💙 Stay Safe, Stay Smart with Safety Buddy.
        </p>
      </div>
    </div>
  );
}

function Feature({ text }) {
  return <div style={styles.featureItem}>{text}</div>;
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    color: "white",
    fontFamily: "Arial",
  },

  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginBottom: "10px",
    animation: "fadeDown 1s ease",
  },

  logo: {
    width: "65px",
    height: "65px",
    borderRadius: "12px",
  },

  title: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#38bdf8",
  },

  subtitle: {
    textAlign: "center",
    fontSize: "17px",
    color: "#cbd5e1",
    marginBottom: "25px",
    animation: "fadeIn 1.2s ease",
  },

  card: {
    opacity: 0,
    transform: "translateY(50px)",
    transition: "all 0.8s ease",
  },

  cardActive: {
    opacity: 1,
    transform: "translateY(0px)",
    background: "rgba(255,255,255,0.08)",
    padding: "25px",
    borderRadius: "20px",
    boxShadow: "0px 10px 25px rgba(0,0,0,0.5)",
    maxWidth: "900px",
    margin: "auto",
    transition: "all 0.8s ease",
  },

  aboutIcon: {
    width: "90px",
    height: "90px",
    display: "block",
    margin: "auto",
    marginBottom: "15px",
    animation: "pulse 2s infinite",
  },

  heading: {
    fontSize: "22px",
    marginTop: "20px",
    color: "#facc15",
  },

  text: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#e2e8f0",
    marginTop: "8px",
  },

  featureBox: {
    marginTop: "15px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "12px",
  },

  featureItem: {
    padding: "12px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.12)",
    fontSize: "15px",
    fontWeight: "bold",
    transition: "0.3s",
    cursor: "pointer",
  },

  devBox: {
    marginTop: "30px",
    padding: "15px",
    borderRadius: "15px",
    background: "rgba(56,189,248,0.15)",
    textAlign: "center",
    animation: "fadeIn 1.5s ease",
  },

  devTitle: {
    fontSize: "18px",
    color: "#38bdf8",
    marginBottom: "8px",
  },

  devText: {
    fontSize: "15px",
    color: "#e2e8f0",
    lineHeight: "1.5",
  },

  footer: {
    textAlign: "center",
    marginTop: "25px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#22c55e",
  },
};

export default About;