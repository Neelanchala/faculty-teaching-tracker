import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

function SectionProgress() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [section, setSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchSection = async () => {
      try {
        const ref = doc(db, "sections", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setSection(null);
          setLoading(false);
          return;
        }

        const data = snap.data();

        // 🔒 Security: ensure owner
        if (data.uid !== user.uid) {
          navigate("/sections");
          return;
        }

        setSection({
          id: snap.id,
          ...data,
          syllabus: data.syllabus || [],
          completedTopics: data.completedTopics || []
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchSection();
  }, [id, user, navigate]);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  if (!section) {
    return (
      <div style={{ padding: 40 }}>
        <h2>No section found</h2>
        <button onClick={() => navigate("/sections")}>
          Back to Sections
        </button>
      </div>
    );
  }

  /* ---------- TOGGLE TOPIC ---------- */
  const toggleTopic = async (topic) => {
    const completed = section.completedTopics.includes(topic)
      ? section.completedTopics.filter(t => t !== topic)
      : [...section.completedTopics, topic];

    await updateDoc(doc(db, "sections", section.id), {
      completedTopics: completed
    });

    setSection({
      ...section,
      completedTopics: completed
    });
  };

  const total = section.syllabus.length;
  const done = section.completedTopics.length;
  const progress =
    total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          {section.section} — {section.subject}
        </h1>

        <div style={styles.meta}>
          <div><strong>Faculty:</strong> {section.facultyName}</div>
          <div><strong>Day:</strong> {section.day}</div>
          <div><strong>Time:</strong> {section.timeSlot}</div>
        </div>

        {/* Progress */}
        <div style={{ marginTop: 20 }}>
          <div style={styles.progressHeader}>
            <span>Syllabus Progress</span>
            <span>{progress}%</span>
          </div>
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress}%`
              }}
            />
          </div>
        </div>

        {/* Checklist */}
        <div style={{ marginTop: 20 }}>
          {section.syllabus.map(topic => (
            <label key={topic} style={styles.topic}>
              <input
                type="checkbox"
                checked={section.completedTopics.includes(topic)}
                onChange={() => toggleTopic(topic)}
              />
              <span>{topic}</span>
            </label>
          ))}
        </div>

        <button
          style={styles.backButton}
          onClick={() => navigate("/sections")}
        >
          ← Back to Sections
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    width: 500,
    background: "#fff",
    padding: 30,
    borderRadius: 14,
    boxShadow: "0 12px 30px rgba(0,0,0,0.12)"
  },
  title: {
    marginBottom: 10
  },
  meta: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    color: "#444"
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6,
    fontWeight: 600
  },
  progressBar: {
    height: 10,
    background: "#e0e0e0",
    borderRadius: 5,
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    background: "#1976d2",
    transition: "width 0.3s ease"
  },
  topic: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 0",
    fontSize: 15
  },
  backButton: {
    marginTop: 20,
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "none",
    background: "#eee",
    cursor: "pointer"
  }
};

export default SectionProgress;
