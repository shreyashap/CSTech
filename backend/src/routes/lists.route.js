import express from "express";
import multer from "multer";
import csvParser from "csv-parser";
import xlsx from "xlsx";
import fs from "fs";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";
import Agent from "../models/agent.model.js";
import Task from "../models/list.model.js";

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv" || 
        file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
        file.mimetype === "application/vnd.ms-excel") {
      cb(null, true);
    } else {
      cb(new Error("Only CSV, XLSX, and XLS files are allowed"), false);
    }
  },
});


const distributeTasks = async (tasks) => {
  const agents = await Agent.find();
  if (agents.length === 0) throw new Error("No agents found");

  let assignedTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    const agentIndex = i % agents.length;
    assignedTasks.push({ ...tasks[i], agent: agents[agentIndex]._id });
  }
  
  return assignedTasks;
};


router.post("/upload", authMiddleware, adminMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = req.file.path;
    let tasks = [];

    if (req.file.mimetype === "text/csv") {
    
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("data", (row) => tasks.push(row))
        .on("end", async () => {
          tasks = await distributeTasks(tasks);
          await Task.insertMany(tasks);
          fs.unlinkSync(filePath);
          res.status(201).json({ message: "Tasks uploaded and assigned successfully" });
        });
    } else {
      
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      tasks = await distributeTasks(sheet);
      await Task.insertMany(tasks);
      fs.unlinkSync(filePath);
      res.status(201).json({ message: "Tasks uploaded and assigned successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find().populate("agent", "name email");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
