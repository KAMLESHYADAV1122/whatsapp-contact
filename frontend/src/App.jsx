import React, { useState } from "react";
import EnterNumber from "./components/EnterNumber";
import ScanQRCode from "./components/ScanQRCode";
import Dashboard from "./pages/Dashboard";
import "./styles.css";

function App() {
  const [mode, setMode] = useState("number");
  const [showDashboard, setShowDashboard] = useState(false);

  if (showDashboard) return <Dashboard />;

  return (
    <div className="container">
      <h1>💬 WhatsApp Connect</h1>

      <div className="buttons">
        <button
          className={mode === "number" ? "active" : ""}
          onClick={() => setMode("number")}
        >
          Enter Number
        </button>
        <button
          className={mode === "qr" ? "active" : ""}
          onClick={() => setMode("qr")}
        >
          Scan QR
        </button>
      </div>

      <div className="content">
        {mode === "number" ? (
          <EnterNumber />
        ) : (
          <ScanQRCode onScanSuccess={() => setShowDashboard(true)} />
        )}
      </div>
    </div>
  );
}

export default App;
