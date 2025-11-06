// Import dependencies and configuration
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize, { connectDB } from "./config/database.js";

// Import all routes
import routes from "./routes/index.js";

// Import models so Sequelize is aware of them
import User from "./models/User.js";
import OTP from "./models/OTP.js"; // NEW: include OTP model

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

/* FIXED CORS CONFIGURATION:
   - Allows frontend from localhost:5173 (Vite dev)
   - Allows deployed frontend from unicse.pages.dev (production)
*/
app.use(
  cors({
    origin: [
      "http://localhost:5173", //your React dev server
      "https://capable-mooncake-8f037f.netlify.app/signup", //your React dev server
      "https://unicse.pages.dev", // your deployed site
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Enable JSON parsing for incoming requests
app.use(express.json());

// Connect to PostgreSQL Database
connectDB();

// Sync models with the database
// `alter: true` updates tables automatically when models change
sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ Models synced with database"))
  .catch((err) => console.error("❌ Error syncing models:", err.message));

// Mount routes (handles all /api/auth/... and other endpoints)
app.use("/api", routes);

// Basic test route
app.get("/", (req, res) => {
  res.send("🚀 Unicsi Backend with PostgreSQL + OTP Service Running");
});

// Start Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
