import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
   console.log('login with:',email,password)
  try {
    const user = await User.findOne({ email }); // Email se user dhundhna
    if (!user) {
        console.log('User not found');
      return res.status(400).json({ message: 'Invalid credentials' }); // Agar user nahi milta
    }
    console.log('User found:', user.email);
    const isMatch = await bcrypt.compare(password, user.password); // Password compare karna
    if (!isMatch) {
        console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid credentials' }); // Agar password match nahi karta
    }

    // JWT token generate karna
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    console.log('Token generated');

    res.json({ token }); // Token bhejna
  } catch (error) {
    console.error('Error in login ',error);
    res.status(500).json({ message: 'Server Error' });
  }
};
