import React, { useState } from "react";
import QrReader from "react-qr-reader-es6";
import axios from "axios";
import contactsData from "../data/contacts.js"; // 25 static contacts

function ScanQRCode({ onScanSuccess }) {
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Handle QR Scan
  const handleScan = async (data) => {
    if (data && !scanned) {
      console.log("✅ QR Data:", data);
      setScanned(true);
      setLoading(true);

      try {
        // Extract name & phone from QR text
        let name = "Scanned Contact";
        let phone = "";

        const matchName = data.match(/Name[:\-]?\s*([A-Za-z ]+)/i);
        const matchPhone = data.match(/(\+?\d{10,15})/);

        if (matchName) name = matchName[1].trim();
        if (matchPhone) phone = matchPhone[0];
        else phone = "9999999999";

        // ✅ Save scanned contact first
        await axios.post("http://localhost:5000/api/contacts", { name, phone });
        console.log("💾 Scanned contact saved:", name, phone);

        // ✅ Save all static contacts (no duplicates)
        const saveContacts = async () => {
          for (const c of contactsData) {
            try {
              await axios.post("http://localhost:5000/api/contacts", {
                name: c.name,
                phone: c.phone,
              });
              console.log("✅ Added:", c.name);
            } catch (err) {
              if (err.response?.status === 409) {
                console.log("⚠️ Skipping duplicate:", c.name);
              } else {
                console.log("⚠️ Error adding:", c.name);
              }
            }
          }
        };

        await saveContacts();

        alert("✅ Scanned contact + 25 static contacts saved successfully!");
        if (onScanSuccess) onScanSuccess();

      } catch (err) {
        console.error("❌ Error saving contact(s):", err);
        alert("Failed to save contact(s). Check console for details.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleError = (err) => {
    console.error("QR Scan Error:", err);
    setError(err);
  };

  if (loading) {
    return <h3 style={{ textAlign: "center" }}>⏳ Saving contacts to database...</h3>;
  }

  return (
    <div className="scan-qr" style={{ textAlign: "center", paddingTop: "30px" }}>
      <h2>📷 Scan WhatsApp QR Code</h2>
      <p>Allow camera permission when prompted.</p>

      <div
        style={{
          width: "320px",
          height: "240px",
          margin: "20px auto",
          border: "2px solid #ccc",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {error && (
        <p style={{ color: "red" }}>
          ⚠️ {error.message || "Unable to access camera. Please allow permissions."}
        </p>
      )}
    </div>
  );
}

export default ScanQRCode;
