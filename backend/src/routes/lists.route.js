import express from "express";
import multer from "multer";
import Agent from "../models/agent.model.js";
import List from "../models/list.model.js";
import Papa from "papaparse";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload & Distribute List
router.post("/upload", upload.single("file"), async (req, res) => {
  const file = fs.readFileSync(req.file.path, "utf8");
  const data = Papa.parse(file, { header: true }).data;
  
  const agents = await Agent.find();
  if (agents.length === 0) return res.status(400).json({ error: "No agents available" });

  const agentCount = agents.length;
  const distributedLists = agents.map((agent, i) => ({
    agentId: agent._id,
    data: data.filter((_, index) => index % agentCount === i),
  }));

  await List.insertMany(distributedLists);
  res.json({ message: "List distributed successfully" });
});

export default router;



