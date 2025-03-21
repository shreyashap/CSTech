import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  phone: { type: String, required: true },
  notes: { type: String, required: true },
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
});

export default mongoose.model("Task", taskSchema);
