import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
  console.log("AUTH USER:", user);
  if (user) navigate("/sections");
}, [user]);

  const login = async () => {
    await signInWithPopup(auth, provider);
  };

  return (
  <div style={styles.page}>
    <div style={styles.card}>
      <h1>Faculty Login</h1>
      <button style={styles.button} onClick={login}>
        Sign in with Google
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
    background: "#f4f6f8"
  },
  card: {
    padding: 40,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
  },
  button: {
    marginTop: 20,
    padding: "10px 20px",
    fontSize: 16,
    cursor: "pointer"
  }
};
