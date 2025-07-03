import express from 'express';
import { getUserProfile, updateUserProfile, deleteUser ,getAllUserPoojas , getAllUsers} from '../controller/userController.js';
import jwt from "../middleware/verifyToken.js";
import verifyToken from "../middleware/verifyToken.js";
const routerU = express.Router();


// Route to get user profile
routerU.get('/getUserProfile',verifyToken, getUserProfile); // ✅ Correct method

// Route to update user profile
routerU.put('/updateUserProfile', verifyToken,updateUserProfile);

// Route to delete user profile
routerU.delete('/deleteUser',verifyToken, deleteUser);

routerU.get("/admin/allUsers", verifyToken, getAllUsers);

routerU.post("/my-bookings", verifyToken, getAllUserPoojas);
export default routerU;
