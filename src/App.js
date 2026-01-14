import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import FacultySetup from "./pages/FacultySetup";
import AddSection from "./pages/AddSection";
import Sections from "./pages/Sections";
import SectionProgress from "./pages/SectionProgress";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Front / Demo page */}
        <Route path="/" element={<LandingPage />} />

        {/* Faculty setup (name, subject etc.) */}
        <Route path="/setup" element={<FacultySetup />} />

        {/* Add teaching section */}
        <Route path="/add" element={<AddSection />} />

        {/* List of all sections */}
        <Route path="/sections" element={<Sections />} />

        {/* Section progress */}
        <Route path="/section/:id" element={<SectionProgress />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
