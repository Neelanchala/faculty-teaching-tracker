import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function FacultyDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const { facultyName, subject, section, time, syllabusText, syllabusImage } =
    location.state || {};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Hello, {facultyName}</h2>

      <div style={styles.card}>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Section:</strong> {section}</p>
        <p><strong>Time:</strong> {time}</p>

        <button
          style={styles.button}
          onClick={() =>
            navigate("/section", {
              state: {
                facultyName,
                subject,
                section,
                syllabusText,
                syllabusImage,
              },
            })
          }
        >
          View Section Progress
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    marginTop: "15px",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
  },
};

export default FacultyDashboard;
