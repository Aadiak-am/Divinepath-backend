import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import adminRoutes from "./routes/adminRoutes.js";

import routerU from './routes/userRoutes.js';
import authRoutes from './routes/authenticationRoutes.js';
import router from './routes/poojaRoutes.js';
import templeRoutes from './routes/templeRoutes.js';

dotenv.config(); // Load environment variables

const app = express();

// ✅ Enable CORS for your frontend
app.use(cors());

// {
//   origin: 'http://localhost:3000', // React dev server
//   credentials: true
// }
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Database Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', routerU);
app.use('/api/pooja', router);
app.use('/api/temples', templeRoutes);
app.use("/api/admin", adminRoutes);
app.get('/', (req, res) => {
  res.send('🚀 DivinePath Backend Running');
});

// ✅ Use PORT from env or fallback to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(" Server Started");
});
