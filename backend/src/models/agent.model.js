import mongoose from "mongoose";

const AgentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
});

export default mongoose.model("Agent", AgentSchema);
