import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* HERO */}
      <div style={styles.hero}>
        <h1 style={styles.title}>Faculty Teaching Tracker</h1>
        <p style={styles.subtitle}>
          A smart dashboard to track syllabus coverage, sections, and
          teaching progress — all in one place.
        </p>

        <button style={styles.primaryBtn} onClick={() => navigate("/sections")}>
          Enter Dashboard →
        </button>
      </div>

      {/* FEATURES */}
      <div style={styles.features}>
        <div style={styles.card}>
          <h3>📚 Syllabus Tracking</h3>
          <p>
            Break syllabus into topics and track completion in real time with
            progress percentage.
          </p>
        </div>

        <div style={styles.card}>
          <h3>🗓 Day-wise Scheduling</h3>
          <p>
            Organize sections by weekday (Monday–Saturday) with time slots for
            easy planning.
          </p>
        </div>

        <div style={styles.card}>
          <h3>📊 Teaching Insights</h3>
          <p>
            Get instant stats on sections, topics covered, and overall teaching
            progress.
          </p>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div style={styles.footer}>
        <p>Built for faculty. Designed for clarity.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1e88e5, #42a5f5)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px 20px",
    boxSizing: "border-box",
  },

  hero: {
    maxWidth: 700,
    textAlign: "center",
    marginBottom: 60,
  },

  title: {
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: 16,
  },

  subtitle: {
    fontSize: "1.2rem",
    lineHeight: 1.6,
    opacity: 0.95,
    marginBottom: 32,
  },

  primaryBtn: {
    background: "#fff",
    color: "#1e88e5",
    border: "none",
    padding: "14px 32px",
    borderRadius: 30,
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },

  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
    maxWidth: 900,
    width: "100%",
    marginBottom: 60,
  },

  card: {
    background: "#ffffff",
    color: "#333",
    padding: 24,
    borderRadius: 16,
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
    textAlign: "center",
  },

  footer: {
    opacity: 0.9,
    fontSize: "0.95rem",
  },
};
