import express from "express";
import dotenv from "dotenv";
import pool from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import cors from "cors";
import createUserTable from "./models/createUserTable.js";
import cookieParser from "cookie-parser";
import createProductTable from "./models/createProduct.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// TABLE CREATION---------------->

createUserTable();
createProductTable();

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

//  ROUTERS ------------------>

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

// ERROR MIDDLEWARE------------>

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Some thing went wrong";
  res.status(statusCode).json({
    ok: false,
    message,
    statusCode,
  });
});
