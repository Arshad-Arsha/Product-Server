// import express from "express";
// import mongoose from "mongoose";
// import userRouter from "./routes/userRoutes.js";
// import authenticationRouter from "./routes/authenticationRoute.js";
// import cookieParser from "cookie-parser";
// import productRouter from "./routes/productRoutes.js";
// import { configDotenv } from "dotenv";

// const restServer = express();
// configDotenv()
// const connectMongo = async () => {
//     try{
//         await mongoose.connect(process.env.MONGO);
//         console.log("connected to database");
        
//     } catch(error) {
//         console.log(error);  
//     }
// };
// restServer.use(express.json())
// restServer.use(cookieParser())

// restServer.use("/user", userRouter)
// restServer.use("/auth", authenticationRouter)
// restServer.use("/product", productRouter);


// restServer.listen(process.env.PORT, () => {
//     connectMongo()
//     console.log("server is running successfully");
    
// })

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

// IMPORTANT: CORS setup for React to send Cookies
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