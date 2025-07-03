import Temple from "../models/Temple.js";

// GET all temples
export const getAllTemples = async (req, res) => {
  try {
    const temples = await Temple.find();

    // 👇 Console log added here to debug response
    console.log("📥 Temples fetched from DB:", temples);

    res.json(temples);
  } catch (err) {
    console.error("❌ Error fetching temples:", err); // 👈 log the error too
    res.status(500).json({ message: "Failed to fetch temples" });
  }
};


// ADD a new temple
export const addTemple = async (req, res) => {
  try {
    const newTemple = new Temple(req.body);
    await newTemple.save();
    res.status(201).json(newTemple);
  } catch (err) {
    res.status(400).json({ message: "Failed to add temple" });
  }
};

// UPDATE a temple
export const updateTemple = async (req, res) => {
  try {
    const updatedTemple = await Temple.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTemple);
  } catch (err) {
    res.status(400).json({ message: "Update failed" });
  }
};

// DELETE a temple
export const deleteTemple = async (req, res) => {
  try {
    await Temple.findByIdAndDelete(req.params.id);
    res.json({ message: "Temple deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
};
