import React, { useState } from "react";

function SOS() {
  const [locationLink, setLocationLink] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch live location
  const getLocation = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      alert("❌ Your browser does not support GPS location.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const link = `https://www.google.com/maps?q=${lat},${lng}`;
        setLocationLink(link);

        setLoading(false);
        alert("✅ Live location fetched successfully!");
      },
      () => {
        setLoading(false);
        alert("❌ Location permission denied. Please allow location access.");
      }
    );
  };

  // Send SOS to all contacts with delay
  const sendSOS = () => {
    const contacts = JSON.parse(localStorage.getItem("emergencyContacts"));

    if (!contacts || contacts.length === 0) {
      alert("❌ No emergency contacts saved. Please add contacts first.");
      return;
    }

    if (!locationLink) {
      alert("❌ Please click 'Get Live Location' first.");
      return;
    }

    const message = `🚨 SOS ALERT 🚨\n\nI am in danger! Please help me immediately.\n\n📍 Live Location:\n${locationLink}\n\n- Sent from Safety Buddy`;

    const encodedMessage = encodeURIComponent(message);

    // Function to open whatsapp one by one
    contacts.forEach((contact, index) => {
      let phone = contact.phone.trim();
      phone = phone.replace(/\s/g, "");

      // Remove 0 if starting
      if (phone.startsWith("0")) {
        phone = phone.substring(1);
      }

      // Add India country code
      if (!phone.startsWith("+91") && phone.length === 10) {
        phone = "91" + phone;
      }

      // Remove "+"
      phone = phone.replace("+", "");

      const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;

      // Delay opening to avoid popup blocking
      setTimeout(() => {
        window.open(whatsappURL, "_blank");
      }, index * 1200); // 1.2 sec gap
    });

    alert("✅ Sending SOS to all saved contacts (WhatsApp will open one by one).");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🚨 SOS Emergency</h1>
      <p style={styles.subHeading}>
        Send SOS message + live location to all saved contacts.
      </p>

      <div style={styles.card}>
        <button style={styles.button} onClick={getLocation}>
          {loading ? "Fetching Location..." : "📍 Get Live Location"}
        </button>

        {locationLink && (
          <p style={styles.locationText}>
            ✅ Location Ready:{" "}
            <a href={locationLink} target="_blank" rel="noreferrer">
              Open Map
            </a>
          </p>
        )}

        <button style={styles.sosButton} onClick={sendSOS}>
          🚨 Send SOS to All Contacts
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #dc2626, #0f172a)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    fontFamily: "Arial",
    color: "white",
  },

  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  subHeading: {
    fontSize: "16px",
    color: "#f1f5f9",
    marginBottom: "25px",
    textAlign: "center",
    maxWidth: "500px",
  },

  card: {
    width: "420px",
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: "25px",
    borderRadius: "18px",
    boxShadow: "0px 6px 15px rgba(0,0,0,0.4)",
    backdropFilter: "blur(12px)",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#38bdf8",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "#0f172a",
    marginBottom: "15px",
  },

  sosButton: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#22c55e",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    color: "white",
    marginTop: "10px",
  },

  locationText: {
    fontSize: "14px",
    color: "#facc15",
    textAlign: "center",
    marginBottom: "15px",
  },
};

export default SOS;