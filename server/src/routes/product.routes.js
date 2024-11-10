import express from "express";
import {
  createProduct,
  deleteProductById,
  editProduct,
  getAllProducts,
  getProductById,
} from "../controllers/product.controller.js";

const router = express.Router();
router
  .get("/get-all-products", getAllProducts)
  .get("/get-product-by-id/:id", getProductById)
  .post("/create-product", createProduct)
  .delete("/delete-product-by-id/:id", deleteProductById)
  .patch("/edit-product/:id", editProduct);
export default router;
