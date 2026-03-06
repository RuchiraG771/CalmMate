import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TextAnalysis from "./features/TextAnalysis";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/text-analysis" element={<TextAnalysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;