import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import jewelryRoutes from "./routes/jewelry.routes.js";

dotenv.config();
connectDB();
const app = express();
app.use(cors({
    //origin: "http://localhost:5173",
    origin: "https://jewelrystore-1-tivq.onrender.com",
    credentials: true
}));
app.use(express.json());
app.use("/jewelry", jewelryRoutes);

app.get("/", (req, res) => res.json({ status: "ok" }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
    console.log(`http://localhost:${PORT}/jewelry`);
});
