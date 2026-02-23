import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ICON IMPORTS
import dashboardIcon from "./assets/icons/dashboard.png";
import onetapIcon from "./assets/icons/onetap.png";
import sosIcon from "./assets/icons/sos.png";
import alertIcon from "./assets/icons/alert.png";
import rescueIcon from "./assets/icons/rescue.png";
import addContactIcon from "./assets/icons/add_contact.png";
import homeIcon from "./assets/icons/home.png";
import profileIcon from "./assets/icons/profile.png";
import aboutIcon from "./assets/icons/about.png";
import logoIcon from "./assets/icons/logo.png";

function MainPage() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  // ❌ Send Location removed from here
  const features = [
    { name: "Dashboard", icon: dashboardIcon, route: "/dashboard" },
    { name: "One Tap Emergency", icon: onetapIcon, route: "/onetap" },
    { name: "SOS", icon: sosIcon, route: "/sos" },
    { name: "Alert (Shake)", icon: alertIcon, route: "/alert" },
    { name: "Rescue", icon: rescueIcon, route: "/rescue" },
    { name: "Add Contact", icon: addContactIcon, route: "/add-contact" },
    { name: "Home", icon: homeIcon, route: "/home" },
    { name: "Profile", icon: profileIcon, route: "/profile" },
    { name: "About", icon: aboutIcon, route: "/about" },
  ];

  const handleFeatureClick = (feature) => {
    navigate(feature.route);
  };

  return (
    <div style={styles.container}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <img src={logoIcon} alt="logo" style={styles.logo} />
        <div>
          <h1 style={styles.heading}>Safety Buddy</h1>
          <p style={styles.tagline}>
            Smart Protection | Shake Alert + Live Location 🚨
          </p>
        </div>
      </div>

      {/* FEATURE GRID */}
      <div style={show ? styles.gridActive : styles.gridHidden}>
        {features.map((item, index) => {
          const isOneTap = item.route === "/onetap";
          const isAlert = item.route === "/alert";

          return (
            <div
              key={index}
              style={{
                ...styles.card,
                ...(isOneTap ? styles.oneTapCard : {}),
                ...(isAlert ? styles.alertCard : {}),
              }}
              onClick={() => handleFeatureClick(item)}
            >
              <img src={item.icon} alt={item.name} style={styles.icon} />
              <h3 style={styles.featureName}>{item.name}</h3>
            </div>
          );
        })}
      </div>

      {/* FOOTER */}
      <p style={styles.footerText}>
        💙 Stay Safe | Safety Buddy App
      </p>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes glowRed {
          0% { box-shadow: 0 0 10px #ef4444; }
          50% { box-shadow: 0 0 25px #ef4444; }
          100% { box-shadow: 0 0 10px #ef4444; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    padding: "25px",
    color: "white",
    fontFamily: "Arial",
  },

  header: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "18px",
    marginBottom: "35px",
    animation: "fadeDown 1s ease",
  },

  logo: {
    width: "70px",
    height: "70px",
    borderRadius: "18px",
    boxShadow: "0px 6px 15px rgba(0,0,0,0.5)",
    animation: "pulse 2s infinite alternate",
  },

  heading: {
    fontSize: "40px",
    color: "#38bdf8",
    fontWeight: "bold",
    margin: 0,
  },

  tagline: {
    margin: 0,
    fontSize: "14px",
    color: "#cbd5e1",
  },

  gridHidden: {
    opacity: 0,
    transform: "translateY(40px)",
  },

  gridActive: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginTop: "10px",
    opacity: 1,
    transform: "translateY(0px)",
    transition: "0.8s ease",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "22px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0px 10px 25px rgba(0,0,0,0.45)",
    cursor: "pointer",
    transition: "0.3s",
  },

  oneTapCard: {
    background: "linear-gradient(135deg, #dc2626, #991b1b)",
    animation: "glowRed 2s infinite",
  },

  alertCard: {
    background: "linear-gradient(135deg, #f97316, #ea580c)",
    animation: "glowRed 2s infinite",
  },

  icon: {
    width: "65px",
    height: "65px",
    marginBottom: "12px",
    animation: "pulse 2s infinite alternate",
  },

  featureName: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#facc15",
  },

  footerText: {
    textAlign: "center",
    marginTop: "40px",
    fontSize: "14px",
    color: "#cbd5e1",
    fontWeight: "bold",
    opacity: 0.8,
  },
};

export default MainPage;