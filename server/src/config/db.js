import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING,
});
pool.on("connect", () => {
  console.log("Db connected successfully");
});

export default pool;
