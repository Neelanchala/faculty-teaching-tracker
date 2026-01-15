import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const DAYS = [
  "All",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function Sections() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [sections, setSections] = useState([]);
  const [activeDay, setActiveDay] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchSections = async () => {
      const q = query(
        collection(db, "sections"),
        where("uid", "==", user.uid)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setSections(data);
      setLoading(false);
    };

    fetchSections();
  }, [user]);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  if (sections.length === 0) {
    return (
      <div style={{ padding: 40 }}>
        <h2>No sections added yet</h2>
        <button onClick={() => navigate("/add")}>
          Add Section
        </button>
      </div>
    );
  }

  /* ---------- STATS ---------- */
  const totalSections = sections.length;
  const totalTopics = sections.reduce(
    (sum, s) => sum + s.syllabus.length,
    0
  );
  const completedTopics = sections.reduce(
    (sum, s) => sum + s.completedTopics.length,
    0
  );

  const overallProgress =
    totalTopics === 0
      ? 0
      : Math.round((completedTopics / totalTopics) * 100);

  /* ---------- FILTER ---------- */
  const filteredSections =
    activeDay === "All"
      ? sections
      : sections.filter(s => s.day === activeDay);

  return (
    <div style={styles.page}>
      <h1>Teaching Dashboard</h1>

      {/* STATS */}
      <div style={styles.stats}>
        <Stat label="Sections" value={totalSections} />
        <Stat label="Topics" value={totalTopics} />
        <Stat label="Completed" value={completedTopics} />
        <Stat label="Progress" value={`${overallProgress}%`} />
      </div>

      {/* WEEK FILTER */}
      <div style={styles.tabs}>
        {DAYS.map(day => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            style={{
              ...styles.tab,
              background:
                activeDay === day ? "#1976d2" : "#e0e0e0",
              color: activeDay === day ? "#fff" : "#000"
            }}
          >
            {day}
          </button>
        ))}
      </div>

      {/* SECTIONS LIST */}
      <div style={{ marginTop: 20 }}>
        {filteredSections.map(sec => (
          <div
            key={sec.id}
            style={styles.card}
            onClick={() => navigate(`/section/${sec.id}`)}
          >
            <strong>
              {sec.section} — {sec.subject}
            </strong>
            <div style={styles.meta}>
              {sec.day} | {sec.timeSlot}
            </div>
          </div>
        ))}
      </div>

      <button
        style={styles.addBtn}
        onClick={() => navigate("/add")}
      >
        + Add New Section
      </button>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div style={styles.statCard}>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: "bold" }}>{value}</div>
    </div>
  );
}

const styles = {
  page: {
    padding: 40,
    background: "#f4f6f8",
    minHeight: "100vh"
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    marginBottom: 20
  },
  statCard: {
    background: "#fff",
    padding: 16,
    borderRadius: 10,
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
    textAlign: "center"
  },
  tabs: {
    display: "flex",
    gap: 8,
    marginBottom: 10
  },
  tab: {
    border: "none",
    padding: "8px 14px",
    borderRadius: 20,
    cursor: "pointer"
  },
  card: {
    background: "#fff",
    padding: 16,
    borderRadius: 10,
    boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
    marginBottom: 12,
    cursor: "pointer"
  },
  meta: {
    fontSize: 13,
    color: "#555"
  },
  addBtn: {
    marginTop: 20,
    padding: 12,
    width: "100%",
    borderRadius: 8,
    border: "none",
    background: "#1976d2",
    color: "#fff",
    fontSize: 16,
    cursor: "pointer"
  }
};

export default Sections;
