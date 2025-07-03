// verifyToken.js
import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Token required or invalid format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userId: decoded.userId,   // ✅ Consistent name: userId
      role: decoded.role,
    };

    console.log("✅ userId from token:", decoded.userId); // optional log
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

export default verifyToken;
