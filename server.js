import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/conn.js";
import color from 'colors'
import userRoutes from './routes/usersRoute.js'
import teamRoutes from './routes/teamRoutes.js'

dotenv.config(); //configure env

const app = express(); //rest object

connectDB(); // connect to database


// setup middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api", userRoutes);
app.use("/api", teamRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Happy Coding!" });
});

const PORT = process.env.PORT || 8000;

// listen to the server
app.listen(PORT, () => console.log(`🟢 Server is running on port ${PORT}`));
