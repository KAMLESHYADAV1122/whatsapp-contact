// import React, { useState } from "react";
// import contactsData from "../data/contacts";

// function Dashboard() {
//   const [contacts, setContacts] = useState(contactsData);
//   const [search, setSearch] = useState("");

//   const handleDelete = (id) => {
//     setContacts(contacts.filter((c) => c.id !== id));
//   };

//   const handleEdit = (id, newName, newPhone) => {
//     setContacts(
//       contacts.map((c) =>
//         c.id === id ? { ...c, name: newName, phone: newPhone } : c
//       )
//     );
//   };

//   const filtered = contacts.filter(
//     (c) =>
//       c.name.toLowerCase().includes(search.toLowerCase()) ||
//       c.phone.includes(search)
//   );

//   return (
//     <div className="dashboard" style={{ padding: "20px", textAlign: "center" }}>
//       <h1>📇 WhatsApp Contacts</h1>
//       <p>
//         Total Contacts: <strong>{contacts.length}</strong>
//       </p>

//       <input
//         type="text"
//         placeholder="Search by name or number"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         style={{ margin: "10px", padding: "6px" }}
//       />

//       <table
//         border="1"
//         style={{
//           margin: "20px auto",
//           borderCollapse: "collapse",
//           width: "90%",
//         }}
//       >
//         <thead>
//           <tr style={{ background: "#f2f2f2" }}>
//             <th>Name</th>
//             <th>Phone</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filtered.map((c) => (
//             <tr key={c.id}>
//               <td>{c.name}</td>
//               <td>{c.phone}</td>
//               <td>
//                 <button
//                   onClick={() => {
//                     const newName = prompt("Edit name:", c.name);
//                     const newPhone = prompt("Edit phone:", c.phone);
//                     if (newName && newPhone) handleEdit(c.id, newName, newPhone);
//                   }}
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button onClick={() => handleDelete(c.id)}>🗑️ Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState } from "react";
import contactsData from "../data/contacts";

function Dashboard() {
  const [contacts, setContacts] = useState(contactsData);
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const handleEdit = (id, newName, newPhone) => {
    setContacts(
      contacts.map((c) =>
        c.id === id ? { ...c, name: newName, phone: newPhone } : c
      )
    );
  };

  const filtered = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="dashboard" style={{ padding: "20px", textAlign: "center" }}>
      <h1>📇 WhatsApp Contacts</h1>
      <p>
        Total Contacts: <strong>{contacts.length}</strong>
      </p>

      <input
        type="text"
        placeholder="Search by name or number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          margin: "10px",
          padding: "8px",
          width: "60%",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <table
        border="1"
        style={{
          margin: "20px auto",
          borderCollapse: "collapse",
          width: "90%",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>
              Serial No.
            </th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>
              Phone Number
            </th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((c, index) => (
              <tr key={c.id}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {index + 1}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {c.name}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {c.phone}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  <button
                    onClick={() => {
                      const newName = prompt("Edit name:", c.name);
                      const newPhone = prompt("Edit phone:", c.phone);
                      if (newName && newPhone)
                        handleEdit(c.id, newName, newPhone);
                    }}
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      marginRight: "6px",
                      cursor: "pointer",
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    style={{
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "15px",
                  color: "gray",
                }}
              >
                No contacts found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
