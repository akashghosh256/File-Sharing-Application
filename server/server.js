import express from "express";
import router from "./routes/routes.js";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./database/db.js";

const app = express();
app.use(cors());
app.use(morgan("dev"));
// configure env
dotenv.config();

// database config
connectDB();

const PORT = 8000;

app.use("/", router);

app.listen(PORT, () => console.log(`server is running on PORT: ${PORT}`));
