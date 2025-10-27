// // import React, { useState } from "react";
// // import { createContact } from "../services/api";

// // export default function EnterNumber({ onSaved }) {
// //   const [name, setName] = useState("");
// //   const [number, setNumber] = useState("");

// //   const save = async () => {
// //     if (!number.trim()) return alert("Please enter a WhatsApp number (with country code).");
// //     try {
// //       const payload = { name: name.trim(), phone: number.trim() };
// //       await createContact(payload);
// //       setName(""); setNumber("");
// //       if (onSaved) onSaved();
// //       alert("Saved contact");
// //     } catch (err) {
// //       alert("Save failed: " + (err.message || err));
// //     }
// //   };

// //   const openWhatsApp = () => {
// //     if (!number.trim()) return alert("Enter number first");
// //     window.open(`https://wa.me/${number.trim()}`, "_blank");
// //   };

// //   return (
// //     <div className="card">
// //       <h3>Enter WhatsApp Number</h3>
// //       <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name (optional)" />
// //       <input value={number} onChange={(e)=>setNumber(e.target.value)} placeholder="Country code + number e.g. 919876543210" />
// //       <div style={{display:'flex', gap:8, justifyContent:'center'}}>
// //         <button onClick={openWhatsApp}>Open in WhatsApp</button>
// //         <button onClick={save}>Save to DB</button>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { createContact } from "../services/api.js";

// export default function EnterNumber({ onSaved }) {
//   const [name, setName] = useState("");
//   const [number, setNumber] = useState("");

//   const normalize = (s) => (s || "").replace(/[^\d+]/g, "").replace(/^\+/, "");

//   const handleSave = async () => {
//     if (!number.trim()) return alert("Please enter a WhatsApp number (with country code).");
//     const phone = normalize(number);
//     try {
//       await createContact({ name: name.trim(), phone });
//       setName(""); setNumber("");
//       if (onSaved) onSaved();
//       // don't block opening WA; show success
//       // note: backend may return created doc
//     } catch (err) {
//       alert("Save failed: " + (err?.response?.data?.message || err.message || err));
//     }
//   };

//   const handleOpen = () => {
//     if (!number.trim()) return alert("Please enter a WhatsApp number!");
//     const phone = normalize(number);
//     window.open(`https://wa.me/${phone}`, "_blank");
//   };

//   return (
//     <div className="card import-card">
//       <div className="row-icon">
//         <img src="/whatsapp-icon.png" alt="wa" className="wa-icon" />
//         <input
//           className="input-number"
//           placeholder="Enter WhatsApp Number"
//           value={number}
//           onChange={(e) => setNumber(e.target.value)}
//         />
//       </div>

//       <div style={{display:"flex", gap:10, justifyContent:"center", marginTop:14}}>
//         <button className="btn" onClick={handleOpen}>Open in WhatsApp</button>
//         <button className="btn outline" onClick={handleSave}>Save to DB</button>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

function EnterNumber() {
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      alert("Please enter a phone number");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Contact saved successfully!");
        setPhone("");
      } else {
        alert(data.message || "Failed to save contact");
      }
    } catch (error) {
      console.error("Error saving contact:", error);
      alert("Server error");
    }
  };

  return (
    <div className="enter-number">
      <h2>Enter WhatsApp Number</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter WhatsApp number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}

export default EnterNumber;
