import { config } from "dotenv";
import express from "express";
import cors from "cors";

// Load environment variables
config();

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: NODE_ENV,
  });
});

app
  .listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server:", err);
    process.exit(1);
  });
