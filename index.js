
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import userRouter from "./routes/userRoutes.js";
import authenticationRouter from "./routes/authenticationRoute.js";
import productRouter from "./routes/productRoutes.js";

const app = express();
configDotenv();


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/auth", authenticationRouter);
app.use("/product", productRouter);

mongoose.connect(process.env.MONGO)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
