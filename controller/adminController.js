// controllers/adminController.js
import Pooja from "../models/pooja.js";
import User from "../models/User.js";

export const getAdminDashboardStats = async (req, res) => {
  try {
    const totalBookings = await Pooja.countDocuments();
    const totalUsers = await User.countDocuments();
    const distinctPujas = await Pooja.distinct("poojaType");
    const totalPujas = distinctPujas.length;

    const recentBookings = await Pooja.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name email");

    res.status(200).json({
      totalBookings,
      totalUsers,
      totalPujas,
      recentBookings,
    });
  } catch (error) {
    console.error("❌ Dashboard Stats Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
