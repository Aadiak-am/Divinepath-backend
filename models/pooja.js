import mongoose from "mongoose";

const poojaSchema = new mongoose.Schema({
  poojaType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  temple: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ✅ Correct reference for populate
  },
});

export default mongoose.model("Pooja", poojaSchema);
