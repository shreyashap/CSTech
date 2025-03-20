import mongoose from "mongoose";

const ListSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent" },
  data: [{ firstName: String, phone: String, notes: String }],
});

export default mongoose.model("List", ListSchema);
