import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ICON
import logoIcon from "./assets/icons/logo.png";
import profileIcon from "./assets/icons/profile.png";

function EditProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    photo: "",
  });

  const [previewPhoto, setPreviewPhoto] = useState("");
  const [loading, setLoading] = useState(false);

  // Load existing profile
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("safetyBuddyProfile"));

    if (savedProfile) {
      setProfile(savedProfile);
      setPreviewPhoto(savedProfile.photo || "");
    } else {
      // Default values
      setProfile({
        name: "Abhishek Kumar",
        email: "example@gmail.com",
        phone: "9110939941",
        address: "Lucknow, Uttar Pradesh",
        bio: "Safety Buddy User 🚨",
        photo: "",
      });
    }
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewPhoto(reader.result);
      setProfile({ ...profile, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  // Save Profile
  const handleSave = () => {
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("safetyBuddyProfile", JSON.stringify(profile));
      setLoading(false);
      alert("✅ Profile Updated Successfully!");
      navigate("/profile"); // go back to profile page
    }, 800);
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <img src={logoIcon} alt="logo" style={styles.logo} />
        <h2 style={styles.heading}>Edit Profile</h2>
      </div>

      {/* CARD */}
      <div style={styles.card}>
        {/* PROFILE IMAGE */}
        <div style={styles.imageBox}>
          <img
            src={previewPhoto ? previewPhoto : profileIcon}
            alt="profile"
            style={styles.profileImage}
          />

          <label style={styles.uploadBtn}>
            📷 Upload Photo
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {/* INPUTS */}
        <input
          style={styles.input}
          type="text"
          name="name"
          placeholder="Enter Name"
          value={profile.name}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="email"
          name="email"
          placeholder="Enter Email"
          value={profile.email}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={profile.phone}
          onChange={handleChange}
        />

        <input
          style={styles.input}
          type="text"
          name="address"
          placeholder="Enter Address"
          value={profile.address}
          onChange={handleChange}
        />

        <textarea
          style={styles.textarea}
          name="bio"
          placeholder="Write Bio"
          value={profile.bio}
          onChange={handleChange}
        />

        {/* BUTTONS */}
        <button
          style={loading ? styles.saveBtnLoading : styles.saveBtn}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "💾 Save Profile"}
        </button>

        <button style={styles.backBtn} onClick={() => navigate("/profile")}>
          ⬅ Back
        </button>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
    animation: "fadeDown 1s ease",
  },

  logo: {
    width: "55px",
    height: "55px",
    borderRadius: "14px",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.4)",
  },

  heading: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#38bdf8",
  },

  card: {
    width: "100%",
    maxWidth: "450px",
    background: "rgba(255,255,255,0.08)",
    padding: "25px",
    borderRadius: "22px",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
    textAlign: "center",
    animation: "fadeUp 1s ease",
  },

  imageBox: {
    marginBottom: "20px",
  },

  profileImage: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "4px solid #38bdf8",
    objectFit: "cover",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.4)",
    animation: "pulse 2s infinite alternate",
  },

  uploadBtn: {
    display: "inline-block",
    marginTop: "12px",
    padding: "10px 15px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.12)",
    color: "#facc15",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  input: {
    width: "90%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "14px",
    border: "none",
    outline: "none",
    fontSize: "15px",
    background: "rgba(255,255,255,0.12)",
    color: "white",
  },

  textarea: {
    width: "90%",
    padding: "12px",
    margin: "8px 0",
    borderRadius: "14px",
    border: "none",
    outline: "none",
    fontSize: "15px",
    height: "80px",
    background: "rgba(255,255,255,0.12)",
    color: "white",
    resize: "none",
  },

  saveBtn: {
    width: "95%",
    padding: "14px",
    marginTop: "15px",
    borderRadius: "15px",
    border: "none",
    background: "linear-gradient(90deg, #38bdf8, #2563eb)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.4)",
    transition: "0.3s",
  },

  saveBtnLoading: {
    width: "95%",
    padding: "14px",
    marginTop: "15px",
    borderRadius: "15px",
    border: "none",
    background: "gray",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "not-allowed",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.4)",
  },

  backBtn: {
    width: "95%",
    padding: "14px",
    marginTop: "12px",
    borderRadius: "15px",
    border: "none",
    background: "linear-gradient(90deg, #facc15, #f97316)",
    color: "#0f172a",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.4)",
    transition: "0.3s",
  },
};

export default EditProfile;