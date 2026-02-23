import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import logo from "./assets/icons/logo.png";

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("✅ Signup Successful!");
      navigate("/login");
    } catch (error) {
      alert("❌ " + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logo} alt="logo" style={styles.logo} />
        <h2 style={styles.title}>Create Account 🚀</h2>
        <p style={styles.subtitle}>Signup for Safety Buddy</p>

        <form onSubmit={handleSignup}>
          <input
            style={styles.input}
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Creating..." : "Signup"}
          </button>
        </form>

        <p style={styles.text}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a, #0f172a)",
    fontFamily: "Arial",
  },

  card: {
    width: "380px",
    padding: "35px",
    borderRadius: "20px",
    backgroundColor: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    boxShadow: "0px 8px 30px rgba(0,0,0,0.5)",
    textAlign: "center",
    animation: "fadeIn 1.5s ease-in-out",
  },

  logo: {
    width: "90px",
    height: "90px",
    borderRadius: "16px",
    marginBottom: "15px",
    animation: "zoomIn 1.5s ease-in-out",
  },

  title: {
    fontSize: "28px",
    color: "#38bdf8",
    fontWeight: "bold",
    marginBottom: "5px",
  },

  subtitle: {
    fontSize: "14px",
    color: "#cbd5e1",
    marginBottom: "25px",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.2)",
    marginBottom: "15px",
    outline: "none",
    fontSize: "15px",
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "white",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#38bdf8",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  text: {
    marginTop: "20px",
    color: "#cbd5e1",
    fontSize: "14px",
  },

  link: {
    color: "#38bdf8",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default Signup;