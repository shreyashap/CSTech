import express from "express";
import Agent from "../models/agent.model.js";

const router = express.Router();

// Create an Agent
router.post('/add', async (req, res) => {
    const { name, email, mobile, password } = req.body;
    try {
      const existingAgent = await Agent.findOne({ email });
      if (existingAgent) return res.status(400).json({ message: 'Agent already exists' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAgent = new Agent({ name, email, mobile, password: hashedPassword });
      await newAgent.save();
  
      res.status(201).json({ message: 'Agent created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // Get all agents
  router.get('/', async (req, res) => {
    try {
      const agents = await Agent.find();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
export default router;
