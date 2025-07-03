import mongoose from 'mongoose';

const templeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  pandits: [String],
  contact: { type: String, required: true }
});

const Temple = mongoose.model("temple", templeSchema);
export default Temple;
