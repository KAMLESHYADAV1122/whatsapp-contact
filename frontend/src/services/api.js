// POST /api/contacts
router.post("/", async (req, res) => {
  try {
    const { name, phone } = req.body;
    if (!phone) return res.status(400).json({ success: false, message: "Phone is required" });

    // Check if phone already exists
    const existing = await Contact.findOne({ phone });
    if (existing) {
      return res.status(409).json({ success: false, message: "Contact already exists" });
    }

    const contact = new Contact({ name, phone });
    await contact.save();

    res.json({ success: true, contact });
  } catch (err) {
    console.error("❌ Save error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});
