import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [facultyName, setFacultyName] = useState("");
  const [subject, setSubject] = useState("");
  const [section, setSection] = useState("");
  const [time, setTime] = useState("");
  const [syllabusText, setSyllabusText] = useState("");
  const [syllabusImage, setSyllabusImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onloadend = () => setSyllabusImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!facultyName || !subject || !section || !time || !syllabusText) {
      alert("Fill all required fields");
      return;
    }

    const newSection = {
      id: Date.now(),
      facultyName,
      subject,
      section,
      time,
      syllabusText,
      syllabusImage,
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
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Add Teaching Section</h2>

        <input style={styles.input} placeholder="Faculty Name"
          value={facultyName} onChange={(e) => setFacultyName(e.target.value)} />

        <input style={styles.input} placeholder="Subject"
          value={subject} onChange={(e) => setSubject(e.target.value)} />

        <input style={styles.input} placeholder="Section"
          value={section} onChange={(e) => setSection(e.target.value)} />

        <input style={styles.input} placeholder="Time Slot"
          value={time} onChange={(e) => setTime(e.target.value)} />

        <textarea
          style={styles.textarea}
          placeholder="Syllabus topics (comma separated)"
          value={syllabusText}
          onChange={(e) => setSyllabusText(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {syllabusImage && (
          <img
            src={syllabusImage}
            alt="Syllabus Preview"
            style={{ width: "100%", marginTop: "10px", border: "1px solid #ccc" }}
          />
        )}

        <button style={styles.button} onClick={handleSave}>
          Save Section
        </button>
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
    background: "#f4f4f4",
  },
  card: {
    background: "#fff",
    padding: "30px",
    width: "400px",
    borderRadius: "8px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
  },
  textarea: {
    width: "100%",
    height: "80px",
    marginTop: "10px",
    padding: "10px",
  },
  button: {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
};

export default Login;
