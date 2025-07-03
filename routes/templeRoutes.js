import express from "express";
// import {
//   getAllTemples,
//   addTemple,
//   updateTemple,
//   deleteTemple
// } from "../controllers/templeController.js";

import { getAllTemples ,addTemple,updateTemple,deleteTemple } from "../controller/templeController.js";
const router = express.Router();

router.get("/", getAllTemples);//
router.post("/", addTemple);
router.put("/:id", updateTemple);
router.delete("/:id", deleteTemple);

export default router;

