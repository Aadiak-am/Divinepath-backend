import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// ==============================
// ✅ Register Controller
// ==============================
export const register = async (req, res) => {
  console.log("Received body: ", req.body);

  try {
    const { fullName, email, password, role } = req.body;

    // Input validation
    if (!fullName || !email || !password) {
      return res.status(400).json({
        type: "Validation Error",
        message: "All fields (fullName, email, password) are required.",
      });
    }

    // Email format validation
    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({
        type: "Validation Error",
        message: "Only Gmail addresses are allowed.",
      });
    }

    // Password strength check
    if (password.length < 6) {
      return res.status(400).json({
        type: "Validation Error",
        message: "Password must be at least 6 characters long.",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        type: "Conflict Error",
        message: "User already registered with this email.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user or admin
    const newUser = new User({
      name: fullName,
      email,
      password: hashedPassword,
      role: role || "user", // 👈 Default user, if role is not passed
    });

    await newUser.save();

    res.status(201).json({
      type: "Success",
      message: "User registered successfully",
    });

  } catch (error) {
    console.error("Registration failed:", error);

    if (error.name === 'MongoServerError' && error.code === 11000) {
      return res.status(500).json({
        type: "Database Error",
        message: "Duplicate key error (email already exists)",
      });
    }

    res.status(500).json({
      type: "Server Error",
      message: "Something went wrong on the server.",
      error: error.message,
    });
  }
};

// ==============================
// ✅ Login Controller
// ==============================
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
