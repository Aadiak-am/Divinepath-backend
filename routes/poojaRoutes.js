// import express from "express";
// import { createPooja, getAllPoojas, updatePooja, deletePooja } from "../controller/poojaController.js";
// import verifyToken from "../middleware/verifyToken.js";
// const router = express.Router();

// // Safe route (no token needed)
// router.get("/all", getAllPoojas);

// // Delay secure route registration until verifyToken is loaded
// //const setupRoutes = async () => {
//   //const { verifyToken } = await import("../middleware/verifyToken.js");
// console.log("verfiergysvf is",verifyToken);
//   router.post("/create", verifyToken, createPooja);
//   router.put("/update", verifyToken, updatePooja);
//   router.delete("/delete", verifyToken, deletePooja);
// //};

// //setupRoutes();

// export default router;

// routes/poojaRoutes.js
import express from "express";
import {
  createPooja,
  getAllUserPoojas,
  updatePooja,
  deletePooja,getAllBookings
} from "../controller/poojaController.js";
import verifyToken  from "../middleware/verifyToken.js"; // 👈 ensure this sets req.user
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

// 👇 Protect all pooja routes
router.post("/create",verifyToken, createPooja);
router.get("/getAllUserPoojas",verifyToken, getAllUserPoojas);
// router.put("/update/:id", isAuthenticated, updatePooja);
// router.delete("/delete/:id", isAuthenticated, deletePooja);

// router.post("/create", isAuthenticated, createPooja);
// router.get("/admin/bookings", verifyToken, getAllBookings);
router.put("/update/:id", verifyToken, updatePooja);
router.delete("/delete/:id",verifyToken, deletePooja);
router.get("/admin/bookings", verifyToken, getAllBookings);

export default router;
