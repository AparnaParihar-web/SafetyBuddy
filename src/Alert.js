import React, { useEffect, useState } from "react";

function Alert() {
  const [shakeDetected, setShakeDetected] = useState(false);
  const [status, setStatus] = useState("Waiting for shake...");
  const [location, setLocation] = useState(null);

  let lastX = null;
  let lastY = null;
  let lastZ = null;
  const threshold = 15; // shake sensitivity

  useEffect(() => {
    const handleMotion = (event) => {
      const { x, y, z } = event.accelerationIncludingGravity;

      if (lastX !== null) {
        const deltaX = Math.abs(lastX - x);
        const deltaY = Math.abs(lastY - y);
        const deltaZ = Math.abs(lastZ - z);

        if (deltaX + deltaY + deltaZ > threshold) {
          triggerAlert();
        }
      }

      lastX = x;
      lastY = y;
      lastZ = z;
    };

    if (window.DeviceMotionEvent) {
      window.addEventListener("devicemotion", handleMotion);
    }

    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, []);

  const triggerAlert = () => {
    if (shakeDetected) return;

    setShakeDetected(true);
    setStatus("🚨 Shake Detected! Getting Location...");

    getLiveLocation();
  };

  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported!");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
        setLocation(mapsLink);

        sendSMS(mapsLink);
      },
      () => {
        alert("Location permission denied!");
      }
    );
  };

  const sendSMS = (mapsLink) => {
    const contact1 = localStorage.getItem("contact1");
    const contact2 = localStorage.getItem("contact2");
    const contact3 = localStorage.getItem("contact3");

    const message = `🚨 EMERGENCY ALERT! I need help immediately!\nMy Live Location: ${mapsLink}`;

    if (contact1) window.open(`sms:${contact1}?body=${encodeURIComponent(message)}`);
    if (contact2) window.open(`sms:${contact2}?body=${encodeURIComponent(message)}`);
    if (contact3) window.open(`sms:${contact3}?body=${encodeURIComponent(message)}`);

    setStatus("🚨 Emergency Message Sent with Live Location!");
    
    setTimeout(() => {
      setShakeDetected(false);
      setStatus("Waiting for shake...");
    }, 6000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📢 Shake Alert + Live Location</h1>

      <div
        style={{
          ...styles.statusBox,
          background: shakeDetected ? "#dc2626" : "#1e3a8a",
          animation: shakeDetected ? "pulse 1s infinite" : "none",
        }}
      >
        {status}
      </div>

      {location && (
        <a href={location} target="_blank" rel="noopener noreferrer" style={styles.link}>
          📍 View Live Location
        </a>
      )}

      <p style={styles.info}>
        Shake your phone strongly to send emergency alert with live location to 3 saved contacts.
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
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    padding: "40px",
    color: "white",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "30px",
  },
  statusBox: {
    padding: "25px",
    borderRadius: "20px",
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
    transition: "0.3s",
  },
  info: {
    fontSize: "16px",
    opacity: 0.8,
    marginTop: "20px",
  },
  link: {
    color: "#38bdf8",
    fontWeight: "bold",
    display: "block",
    marginTop: "10px",
  },
};

export default Alert;