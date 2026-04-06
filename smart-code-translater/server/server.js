import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
  console.log("MONGODB_URI:", process.env.MONGODB_URI);


mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT, () =>
    console.log(`Server running on ${process.env.PORT}`)
  );
});