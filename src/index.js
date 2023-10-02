import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { SettingsProvider } from "./components/SettingsContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </Router>
  </React.StrictMode>
);
