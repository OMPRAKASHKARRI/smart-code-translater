import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import codeRoutes from "./src/routes/code.routes.js"; // ✅ ADD THIS

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/code", codeRoutes); // ✅ ADD THIS

console.log("GROQ KEY:", process.env.GROQ_API_KEY);

console.log("MONGODB_URI:", process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("MongoDB connected ✅");
  app.listen(process.env.PORT, () =>
    console.log(`Server running on ${process.env.PORT} 🚀`)
  );
})
.catch(err => console.log(err));