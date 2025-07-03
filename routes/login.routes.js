import express from 'express';
import { loginUser } from '../controller/userController.js'; 

const router = express.Router();

// POST request to login user
router.post('/login', loginUser); 

export default router;
