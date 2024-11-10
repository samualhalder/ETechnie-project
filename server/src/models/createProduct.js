import pool from "../config/db.js";

const createProductTable = async () => {
  const queryString = `
        CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    discount INT DEFAULT 0,
    image varchar(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

    `;
  try {
    await pool.query(queryString);
    console.log("product table created successfully");
  } catch (error) {
    console.log(error);
  }
};

export default createProductTable;
