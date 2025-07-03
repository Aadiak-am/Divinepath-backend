import jwt from "jsonwebtoken";
import User from "../models/User.js";  // Capital "U" correct hai

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token required or badly formatted" });
  }

  const token = authHeader.split(" ")[1]; // Bearer token se actual token nikalna

  try {
    // JWT verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // DB se user dhundho decoded id se
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // req.user me sirf id aur role daalo
    req.user = {
      id: user._id,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// export default nahi chahiye yahan, ya agar default export chahiye toh:
 export default isAuthenticated;
