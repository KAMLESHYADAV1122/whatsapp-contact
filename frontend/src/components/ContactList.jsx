import React, { useEffect, useState } from "react";
import { fetchContacts, deleteContact, updateContact } from "../services/api";

export default function ContactList({ refreshSignal = 0 }) {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [temp, setTemp] = useState({ name: "", phone: "" });

  async function load() {
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setContacts(null);
    }
  }

  useEffect(() => {
    load();
  }, [refreshSignal]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    await deleteContact(id);
    load();
  };

  const startEdit = (c) => {
    setEditingId(c._id);
    setTemp({ name: c.name || "", phone: c.phone || c.number || "" });
  };

  const saveEdit = async (id) => {
    await updateContact(id, temp);
    setEditingId(null);
    load();
  };

  const filtered = (contacts || []).filter(
    (c) =>
      (c.name || "").toLowerCase().includes(filter.toLowerCase()) ||
      (c.phone || c.number || "").includes(filter)
  );

  return (
    <div className="card list-card" style={{ padding: "20px" }}>
      <div className="list-header" style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Contacts</h3>
        <div className="total">Total: {Array.isArray(contacts) ? contacts.length : 0}</div>
      </div>

      <div style={{ margin: "10px 0" }}>
        <input
          placeholder="Filter by name or number"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: "100%", padding: "8px", borderRadius: "5px" }}
        />
      </div>

      {contacts === null && (
        <div className="error" style={{ color: "red" }}>
          Could not load contacts. Please check your backend.
        </div>
      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Serial No.</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Name</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Phone Number</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Edit / Delete</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((c, index) => (
            <tr key={c._id}>
              <td
                style={{
                  textAlign: "center",
                  border: "1px solid #ddd",
                  padding: "8px",
                }}
              >
                {index + 1}
              </td>

              {editingId === c._id ? (
                <>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <input
                      value={temp.name}
                      onChange={(e) => setTemp({ ...temp, name: e.target.value })}
                      style={{ width: "100%", padding: "5px" }}
                    />
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <input
                      value={temp.phone}
                      onChange={(e) => setTemp({ ...temp, phone: e.target.value })}
                      style={{ width: "100%", padding: "5px" }}
                    />
                  </td>
                  <td style={{ textAlign: "center", border: "1px solid #ddd", padding: "8px" }}>
                    <button onClick={() => saveEdit(c._id)}>💾 Save</button>
                    <button onClick={() => setEditingId(null)}>❌ Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{c.name}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {c.phone || c.number}
                  </td>
                  <td style={{ textAlign: "center", border: "1px solid #ddd", padding: "8px" }}>
                    <button
                      onClick={() => startEdit(c)}
                      style={{
                        marginRight: "5px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      style={{
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
