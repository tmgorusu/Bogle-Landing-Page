import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Homepage from "./Homepage";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import Security from "./Security";
import "./App.css";

function App() {
  useEffect(() => {
    // Set the default title
    document.title = "Bogle Pay - Smart Payments for Modern Businesses";
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/security" element={<Security />} />
      </Routes>
    </Router>
  );
}

export default App;
