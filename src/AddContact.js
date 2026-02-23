import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddContact() {
  const navigate = useNavigate();

  const [contacts, setContacts] = useState([
    { name: "", phone: "" },
    { name: "", phone: "" },
    { name: "", phone: "" },
  ]);

  const [loading, setLoading] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  const handleSave = () => {
    // Validation
    for (let i = 0; i < contacts.length; i++) {
      if (!contacts[i].name || !contacts[i].phone) {
        alert("❌ Please fill all 3 contacts properly.");
        return;
      }
    }

    setLoading(true);

    // Save to LocalStorage
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts));

    setTimeout(() => {
      setLoading(false);

      alert(
        "✅ All 3 Emergency Contacts Saved Successfully!\n\n📩 Message:\nHi, I have saved you as my emergency contact. You will receive SOS + Live Location if I am in trouble."
      );

      navigate("/home");
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>➕ Add Emergency Contacts</h1>
      <p style={styles.subHeading}>
        Add 3 trusted people who will receive SOS + Live Location 🚨
      </p>

      <div style={styles.card}>
        {contacts.map((contact, index) => (
          <div key={index} style={styles.contactBox}>
            <h3 style={styles.contactTitle}>Contact {index + 1}</h3>

            <input
              style={styles.input}
              type="text"
              placeholder="Enter Name"
              value={contact.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />

            <input
              style={styles.input}
              type="text"
              placeholder="Enter Phone Number"
              value={contact.phone}
              onChange={(e) => handleChange(index, "phone", e.target.value)}
            />
          </div>
        ))}

        <button style={styles.button} onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Contacts"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a, #0f172a)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "30px",
    fontFamily: "Arial",
    color: "white",
    animation: "fadeIn 1s ease-in-out",
  },

  heading: {
    fontSize: "34px",
    fontWeight: "bold",
    color: "#38bdf8",
    marginBottom: "10px",
    animation: "zoomIn 0.8s ease",
  },

  subHeading: {
    fontSize: "16px",
    color: "#cbd5e1",
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
    animation: "fadeUp 0.8s ease",
  },

  contactBox: {
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "12px",
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  contactTitle: {
    fontSize: "18px",
    color: "#facc15",
    marginBottom: "8px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "15px",
    marginBottom: "10px",
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
    marginTop: "10px",
    transition: "0.3s",
  },
};

export default AddContact;