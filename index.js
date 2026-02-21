

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { configDotenv } from "dotenv";
// import userRouter from "./routes/userRoutes.js";
// import authenticationRouter from "./routes/authenticationRoute.js";
// import productRouter from "./routes/productRoutes.js";

// const app = express();
// configDotenv();

// // IMPORTANT: CORS setup for React to send Cookies
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.json());
// app.use(cookieParser());

// app.use("/user", userRouter);
// app.use("/auth", authenticationRouter);
// app.use("/product", productRouter);

// mongoose.connect(process.env.MONGO)
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(err => console.log(err));

// app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import userRouter from "./routes/userRoutes.js";
import authenticationRouter from "./routes/authenticationRoute.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();

const app = express();

/* ==============================
   CORS CONFIGURATION
============================== */

const allowedOrigins = [
  "http://localhost:5173",
  "https://product-client-omega.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

/* ==============================
   MIDDLEWARE
============================== */

app.use(express.json());
app.use(cookieParser());

/* ==============================
   ROUTES
============================== */

app.use("/user", userRouter);
app.use("/auth", authenticationRouter);
app.use("/product", productRouter);

/* ==============================
   DATABASE CONNECTION
============================== */

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

/* ==============================
   SERVER
============================== */

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});