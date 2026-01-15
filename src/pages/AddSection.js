import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

function AddSection() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [facultyName, setFacultyName] = useState("");
  const [subject, setSubject] = useState("");
  const [section, setSection] = useState("");
  const [day, setDay] = useState("Monday");
  const [timeSlot, setTimeSlot] = useState("");
  const [syllabusInput, setSyllabusInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user) {
      alert("You must be logged in");
      return;
    }

    if (!facultyName || !subject || !section || !timeSlot) {
      alert("Please fill all required fields");
      return;
    }

    const syllabusArray = syllabusInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    setLoading(true);

    try {
      await addDoc(collection(db, "sections"), {
        uid: user.uid,
        facultyName,
        subject,
        section,
        day,
        timeSlot,
        syllabus: syllabusArray,
        completedTopics: [],
        createdAt: serverTimestamp()
      });

      navigate("/sections");
    } catch (err) {
      console.error(err);
      alert("Failed to save section");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={{ textAlign: "center" }}>Add Teaching Section</h2>

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

        <select
          style={styles.input}
          value={day}
          onChange={(e) => setDay(e.target.value)}
        >
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
        </select>

        <input
          style={styles.input}
          placeholder="Time Slot (e.g. 3:00–4:00)"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        />

        <textarea
          style={{ ...styles.input, height: 90 }}
          placeholder="Syllabus topics (comma separated)"
          value={syllabusInput}
          onChange={(e) => setSyllabusInput(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Section"}
        </button>
      </div>
    </div>
  );
}

/* ✅ THIS WAS MISSING — NOW FIXED */
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8"
  },
  card: {
    width: 420,
    background: "#fff",
    padding: 30,
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    cursor: "pointer"
  }
};

export default AddSection;
