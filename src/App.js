import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Sections from "./pages/Sections";
import AddSection from "./pages/AddSection";
import SectionProgress from "./pages/SectionProgress";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/sections"
        element={
          <ProtectedRoute>
            <Sections />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddSection />
          </ProtectedRoute>
        }
      />

      <Route
        path="/section/:id"
        element={
          <ProtectedRoute>
            <SectionProgress />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
