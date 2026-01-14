import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddSection() {
  const navigate = useNavigate();

  const [facultyName, setFacultyName] = useState("");
  const [subject, setSubject] = useState("");
  const [section, setSection] = useState("");
  const [day, setDay] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [syllabusText, setSyllabusText] = useState("");

  const handleSave = () => {
    if (
      !facultyName ||
      !subject ||
      !section ||
      !day ||
      !timeSlot ||
      !syllabusText
    ) {
      alert("Please fill all fields");
      return;
    }

    const newSection = {
      id: Date.now(),
      facultyName,
      subject,
      section,
      day,
      timeSlot,
      syllabusText,
    };

    const existing =
      JSON.parse(localStorage.getItem("sections")) || [];

    localStorage.setItem(
      "sections",
      JSON.stringify([...existing, newSection])
    );

    navigate("/sections");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Add Teaching Section</h2>

        <input
          style={styles.input}
          placeholder="Faculty Name"
          value={facultyName}
          onChange={(e) => setFacultyName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Section (e.g. ECE-A)"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />

        {/* ✅ DAY SELECTOR */}
        <select
          style={styles.input}
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          <option value="">Select Day</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
        </select>

        <input
          style={styles.input}
          placeholder="Time Slot (e.g. 10:00 – 11:00)"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        />

        <textarea
          style={styles.textarea}
          placeholder="Syllabus topics (comma separated)"
          value={syllabusText}
          onChange={(e) => setSyllabusText(e.target.value)}
        />

        <button style={styles.button} onClick={handleSave}>
          Save Section
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    width: "420px",
    padding: "40px",
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    height: "90px",
    marginBottom: "20px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    resize: "none",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#1976d2",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default AddSection;
