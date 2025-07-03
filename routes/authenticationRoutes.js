import express from 'express'
import { register, login } from '../controller/authController.js'

const Arouter = express.Router();

// Register and Login routes
Arouter.post('/register', register);
Arouter.post('/login', login);

export default Arouter;

