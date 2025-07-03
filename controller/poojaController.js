import jwt from "jsonwebtoken";
import Pooja from "../models/pooja.js";
import User from "../models/User.js";




// // ✅ Get all bookings (Admin)
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Pooja.find()
//       .populate("bookedBy", "name email")
//       .sort({ date: -1 });

//     res.status(200).json({ message: "All bookings fetched", bookings });
//   } catch (error) {
//     console.error("❌ Error fetching bookings:", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Pooja.find()
      .populate("userId", "name email") // Correct field (userId) reference
      .sort({ date: -1 }); // Latest first

    // Dynamic bookings data mapping (frontend-friendly)
    const dynamicBookings = bookings.map((b, index) => ({
      _id: b._id,
      bookingId: `#DP${String(index + 1).padStart(3, "0")}`,
      user: b.userId ? b.userId.name : "N/A",
      email: b.userId ? b.userId.email : "N/A",
      poojaType: b.poojaType,
      date: b.date,
      status: b.status || "Pending",
      temple: b.temple,
    }));

    res.status(200).json({ message: "All bookings fetched", bookings: dynamicBookings });
  } catch (error) {
    console.error("❌ Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Create a new pooja booking
export const createPooja = async (req, res) => {
  const { poojaType, date, temple } = req.body;

  console.log("Booking Request:", { poojaType, date, temple, userId: req.user.id });

  try {
    const newPooja = new Pooja({
      poojaType,
      date,
      temple,
      bookedBy: req.user.id,
    });

    await newPooja.save();

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.bookedPoojasIds.push(newPooja._id);
    await user.save();

    res.status(201).json({ message: "Pooja booked successfully", newPooja });
  } catch (error) {
    console.error("❌ Error while saving pooja:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUserPoojas = async (req, res) => {
  try {
    const poojas = await Pooja.find().populate("userId", "name email");
    res.status(200).json(poojas);
  } catch (error) {
    console.error("❌ Error fetching user poojas:", error);
    res.status(500).json({ message: "Server error" });
  }
};


//export default mongoose.model("Pooja", poojaSchema);
//Update pooja booking

export const updatePooja = async (req, res) => {
  const { poojaType, price, category, temple } = req.body;
  const pujaId = req.params.id;

  try {
    const puja = await Pooja.findById(pujaId);
    if (!puja) return res.status(404).json({ message: "Puja not found" });

    if (puja.bookedBy && puja.bookedBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Not authorized" });
    }

    puja.poojaType = poojaType || puja.poojaType;
    puja.price = price || puja.price;
    puja.category = category || puja.category;
    puja.temple = temple || puja.temple;  // ✅ Important fix

    await puja.save();
    res.status(200).json({ message: "Puja updated successfully", puja });
  } catch (error) {
    console.error("❌ Update Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// ✅ Delete a puja (Admin or owner)
// export const deletePooja = async (req, res) => {
//   const pujaId = req.params.id;

//   try {
//     const puja = await Pooja.findById(pujaId);
//     if (!puja) return res.status(404).json({ message: "Puja not found" });

//     // Only admin or owner can delete
//     if (puja.bookedBy.toString() !== req.user.id && req.user.role !== "admin") {
//       return res.status(403).json({ message: "Access denied: Not authorized" });
//     }

//     await Pooja.findByIdAndDelete(pujaId);
//     res.status(200).json({ message: "Puja deleted successfully" });
//   } catch (error) {
//     console.error("❌ Delete Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };


export const deletePooja = async (req, res) => {
  const pujaId = req.params.id;

  try {
    const puja = await Pooja.findById(pujaId);
    if (!puja) return res.status(404).json({ message: "Puja not found" });

    // ✅ Null check added
    if (puja.bookedBy && puja.bookedBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Not authorized" });
    }

    await Pooja.findByIdAndDelete(pujaId);
    res.status(200).json({ message: "Puja deleted successfully" });
  } catch (error) {
    console.error("❌ Delete Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
