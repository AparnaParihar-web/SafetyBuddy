import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ICONS
import profileIcon from "./assets/icons/profile.png";
import logoIcon from "./assets/icons/logo.png";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "Abhishek Kumar",
    email: "example@gmail.com",
    phone: "9110939941",
    address: "Lucknow, Uttar Pradesh",
    bio: "Safety Buddy User 🚨",
    photo: "",
  });

  // Load saved profile from localStorage
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("safetyBuddyProfile"));
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <img src={logoIcon} alt="logo" style={styles.logo} />
        <h2 style={styles.title}>My Profile</h2>
      </div>

      {/* PROFILE CARD */}
      <div style={styles.card}>
        {/* PHOTO */}
        <img
          src={profile.photo ? profile.photo : profileIcon}
          alt="profile"
          style={styles.photo}
        />

        <h2 style={styles.name}>{profile.name}</h2>
        <p style={styles.text}>📧 {profile.email}</p>
        <p style={styles.text}>📱 {profile.phone}</p>
        <p style={styles.text}>📍 {profile.address}</p>

        <p style={styles.bio}>{profile.bio}</p>

        {/* BUTTONS */}
        <div style={styles.btnGroup}>
          <button
            style={styles.editBtn}
            onClick={() => navigate("/edit-profile")}
          >
            ✏️ Edit Profile
          </button>

          <button style={styles.backBtn} onClick={() => navigate("/home")}>
            ⬅ Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    padding: "20px",
    fontFamily: "Arial",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "25px",
    animation: "fadeDown 1s ease",
  },

  logo: {
    width: "55px",
    height: "55px",
    borderRadius: "12px",
    boxShadow: "0px 6px 15px rgba(0,0,0,0.4)",
  },

  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#38bdf8",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "rgba(255,255,255,0.08)",
    borderRadius: "22px",
    padding: "25px",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
    textAlign: "center",
    animation: "fadeUp 1s ease",
  },

  photo: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #38bdf8",
    marginBottom: "15px",
    boxShadow: "0px 6px 15px rgba(0,0,0,0.4)",
    animation: "pulse 2s infinite alternate",
  },

  name: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#facc15",
  },

  text: {
    fontSize: "15px",
    color: "#cbd5e1",
    margin: "5px 0px",
  },

  bio: {
    marginTop: "15px",
    fontSize: "15px",
    padding: "12px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.12)",
    color: "#e2e8f0",
    fontStyle: "italic",
  },

  btnGroup: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  editBtn: {
    padding: "14px",
    borderRadius: "15px",
    border: "none",
    background: "linear-gradient(90deg, #38bdf8, #2563eb)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0px 8px 18px rgba(0,0,0,0.4)",
    transition: "0.3s",
  },

  backBtn: {
    padding: "14px",
    borderRadius: "15px",
    border: "none",
    background: "linear-gradient(90deg, #facc15, #f97316)",
    color: "#0f172a",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0px 8px 18px rgba(0,0,0,0.4)",
    transition: "0.3s",
  },
};

export default Profile;