import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FacultySetup() {
  const navigate = useNavigate();

  const [facultyName, setFacultyName] = useState("");
  const [subject, setSubject] = useState("");
  const [section, setSection] = useState("");
  const [time, setTime] = useState("");
  const [syllabus, setSyllabus] = useState("");

  const handleContinue = () => {
    if (!facultyName || !subject || !section || !time || !syllabus) {
      alert("Please fill all fields");
      return;
    }

    navigate("/faculty", {
      state: { facultyName, subject, section, time, syllabus, role: "faculty" },
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Faculty Setup</h2>

        <input style={styles.input} placeholder="Faculty Name"
          value={facultyName} onChange={(e) => setFacultyName(e.target.value)} />

        <input style={styles.input} placeholder="Subject"
          value={subject} onChange={(e) => setSubject(e.target.value)} />

        <input style={styles.input} placeholder="Section"
          value={section} onChange={(e) => setSection(e.target.value)} />

        <input style={styles.input} placeholder="Time Slot"
          value={time} onChange={(e) => setTime(e.target.value)} />

        <textarea style={styles.textarea} placeholder="Paste syllabus here"
          value={syllabus} onChange={(e) => setSyllabus(e.target.value)} />

        <button style={styles.button} onClick={handleContinue}>
          Save & Continue
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f4f4f4" },
  card: { background: "#fff", padding: "30px", width: "380px", borderRadius: "8px", textAlign: "center" },
  input: { width: "100%", padding: "10px", marginTop: "10px" },
  textarea: { width: "100%", height: "80px", marginTop: "10px", padding: "10px" },
  button: { marginTop: "15px", width: "100%", padding: "10px", backgroundColor: "#1976d2", color: "#fff", border: "none" },
};

export default FacultySetup;
