import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/index.js";
import authRoutes from "./routes/auth.route.js";
import agentRoutes from "./routes/agent.route.js";
import taskRoutes from "./routes/lists.route.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
