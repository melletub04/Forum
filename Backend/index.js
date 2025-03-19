import express from "express";
import cors from "cors";
import threadsRoutes from "./routes/threads.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use (threadsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
