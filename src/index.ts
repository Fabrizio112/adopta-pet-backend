import express from "express";
import authRouter from "./routes/authRoute";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import animalRouter from "./routes/animalRoute";
import cors from "cors";

dotenv.config();

connectDB();

export const app = express();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});


app.use(cors({
    origin: process.env.FRONTEND_URL
}))
app.use(express.json());
app.use("/auth", authRouter);
app.use("/animals", animalRouter);


app.get("/", (req, res) => {
    res.send("Hello, World!");
});