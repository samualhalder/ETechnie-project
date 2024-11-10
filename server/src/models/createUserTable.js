import pool from "../config/db.js";

const createUserTable = async () => {
  const queryText = `
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            firstName VARCHAR(100) NOT NULL,
            lastName VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL ,
            created_at TIMESTAMP DEFAULT NOW()
)
    `;
  try {
    await pool.query(queryText);
    console.log("user table created successfully");
  } catch (error) {
    console.log("error user table", error);
  }
};

export default createUserTable;
