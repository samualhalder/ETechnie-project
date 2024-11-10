import pool from "../config/db.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(firstName, lastName, email, password);

  if (!firstName || !lastName || !email || !password) {
    return next(errorHandler(400, "Please provide all the fields"));
  }
  try {
    const findUser = await pool.query(`SELECT * FROM users where email=$1`, [
      email,
    ]);

    if (findUser.rows[0]) {
      return next(errorHandler(400, "User alredy exists"));
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await pool.query(
      `INSERT INTO users(firstName,lastName,email,password) VALUES($1,$2,$3,$4) RETURNING *`,
      [firstName, lastName, email, hashedPassword]
    );
    res
      .status(200)
      .json({ message: "user creaed succesfully", uset: user.rows[0] });
  } catch (error) {
    return next(errorHandler(error, 500));
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "Please provide all the fields"));
  }
  try {
    const result = await pool.query(`SELECT * FROM users where email=$1`, [
      email,
    ]);
    if (!result.rows[0]) {
      return next(errorHandler(400, "Wrong credentials."));
    }
    const user = result.rows[0];
    console.log(user);

    const comparePassword = await bcryptjs.compare(password, user.password);
    if (!comparePassword) {
      return next(errorHandler(400, "Wrong credentials."));
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    console.log(process.env.JWT_SECRET, token);

    res
      .status(200)
      .cookie("acesses_token", token, {
        httpOnly: true,
        sameSite: "none",
      })
      .json({ message: "Singin successfull", token });
  } catch (error) {
    return next(errorHandler(500, error));
  }
};
