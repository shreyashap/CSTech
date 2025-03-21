import express from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/auth.middleware.js";
import User from "../models/user.model.js";
import Agent from "../models/agent.model.js";

const router = express.Router();


const adminMiddleware = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user || user.role !== "admin") return res.status(403).json({ error: "Access denied" });
  next();
};


router.post(
  "/add",
  authMiddleware,
  adminMiddleware,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("mobile").isLength({ min: 10 }).withMessage("Valid mobile number is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, mobile, password } = req.body;

    try {
      let agent = await Agent.findOne({ email });
      if (agent) return res.status(400).json({ error: "Agent already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);
      agent = new Agent({ name, email, mobile, password: hashedPassword });
      await agent.save();

      res.status(201).json({ message: "Agent added successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);


router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const agents = await Agent.find().select("-password");
    res.json(agents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put(
  "/update/:id",
  authMiddleware,
  adminMiddleware,
  [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("mobile").optional().isLength({ min: 10 }).withMessage("Valid mobile number is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
      if (!updatedAgent) return res.status(404).json({ error: "Agent not found" });

      res.json(updatedAgent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);



router.delete("/delete/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deletedAgent = await Agent.findByIdAndDelete(req.params.id);
    if (!deletedAgent) return res.status(404).json({ error: "Agent not found" });

    res.json({ message: "Agent deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
