import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import adminRoutes from "./routes/admin.js";
import coordinatorRoutes from "./routes/coordinator.js";
import leadRoutes from "./routes/lead.js";
import deanRoutes from "./routes/dean.js";
import dotenv from "dotenv";
import technologiesRoutes from "./routes/technologies.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);
app.use("/coordinator", coordinatorRoutes);
app.use("/lead", leadRoutes);
app.use("/api", deanRoutes);
app.use("/technologies", technologiesRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
