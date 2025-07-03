import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user', // 'admin' for admin role
  },
  bookedPoojasIds : [   {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pooja'  // 👈 This tells Mongoose it's a reference to Pooja model
    }
  ]
});


const User = mongoose.model('User', userSchema);
export default User;

