import pool from "../config/db.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createProduct = async (req, res, next) => {
  const { title, price, description, image, category, discount } = req.body;
  if (!title || !price || !description || !image || !category || !discount) {
    return next(errorHandler(400, "Fill all the fields"));
  }

  try {
    const intPrice = +price;
    const intDiscoutn = +discount;
    const result = await pool.query(
      `INSERT INTO products(title,price,description,image,category,discount) VALUES($1,$2,$3,$4,$5,$6)`,
      [title, intPrice, description, image, category, intDiscoutn]
    );
    res.status(200).json({
      message: "porduct created successfully",
      product: result.rows[0],
    });
  } catch (error) {
    return next(errorHandler(500, error));
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT * FROM products`);
    res.status(200).json(result.rows);
  } catch (error) {
    next(errorHandler(500, error));
  }
};
export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM products WHERE id=$1`, [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(errorHandler(500, error));
  }
};

export const deleteProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM products WHERE id=$1`, [id]);
    res.status(200).json({ message: "product deleted successfully." });
  } catch (error) {
    next(errorHandler(500, error));
  }
};

export const editProduct = async (req, res, next) => {
  const { id } = req.params;
  const { title, price, description, image, category, discount } = req.body;
  try {
    await pool.query(
      `UPDATE products SET title=$1,description=$2,price=$3,discount=$4,category=$5,image=$6 WHERE id=$7`,
      [title, description, price, discount, category, image, id]
    );
    res.status(200).json({ message: "product updated successfully" });
  } catch (error) {
    next(errorHandler(500, error));
  }
};
