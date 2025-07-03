import bcrypt from 'bcryptjs';
// import { Pooja } from "../models/Pooja.js";
import User from '../models/User.js';

// ✅ 1. Get Logged-in User Profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // Extracted from token by verifyToken
    console.log("✅ userId:", userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("❌ Get Profile Error:", error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("name email role"); // Only specific fields
    res.status(200).json({ message: "All users fetched", users });
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ 2. Update Logged-in User Profile
export const updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    if (password && password.trim() !== '') {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error("❌ Update Profile Error:", error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


// ✅ 3. Delete Logged-in User
export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("❌ Delete User Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ✅ Get all poojas booked by the logged-in user
// controllers/userController.js
// controllers/poojaController.js




export const getAllUserPoojas = async (req, res) => {
  try {
    const userId = req.user.userId; // ✅ From JWT token

    console.log("✅ userId from token:", userId);

    const user = await User.findById(userId).populate({
      path: "bookedPoojasIds",   // This must match your User model
      model: "Pooja",
      populate: {
        path: "userId",          // Pooja schema field
        model: "User",
        select: "name email",    // Only return name and email
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("✅ Populated bookedPoojasIds:\n", JSON.stringify(user.bookedPoojasIds, null, 2));

    res.status(200).json({
      message: "Poojas fetched successfully",
      poojas: user.bookedPoojasIds,
    });

  } catch (error) {
    console.error("❌ Error fetching user poojas:", error);
    res.status(500).json({ message: "Server error" });
  }
};
