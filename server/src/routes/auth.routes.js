import express from "express";
import { createUser, signIn } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/signup", createUser).post("/login", signIn);

export default router;
