import sequelize from "./config/database.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import routes from "./routes/index.js";
import User from "./models/User.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to PostgreSQL
connectDB();

// Sync models with database
sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ Models synced with database"))
  .catch((err) => console.error("❌ Error syncing models:", err.message));

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Unicsi Backend with PostgreSQL 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
