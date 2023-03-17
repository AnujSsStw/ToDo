import express, { Router } from "express";
import { hash, compare } from "bcrypt";
import { User } from "../schema";
import jwt from "jsonwebtoken";
import { key } from "../index";

const authRouter: Router = express.Router();

authRouter.post("/signIn", async (req, res) => {
  const { email, password }: { email: string; password: string } = req.body;
  if (email.includes("@") && password.length > 2) {
    const hashPass = await hash(password, 10);
    try {
      const data = await User.create({ email, password: hashPass });
      await data.save();
      return res.send(data);
    } catch (error) {
      return res.send("Email already exist");
    }
  }
  return res.send("ok");
});

authRouter.get("/login", async (req, res) => {
  const { email, password }: { email: string; password: string } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.send("user not found lol");
  }

  const verify = await compare(password, user.password as string);
  if (!verify) {
    return res.send("wrong password");
  }

  const accessToken = jwt.sign(user.id, key);
  // res.cookie("coo", accessToken, { httpOnly: false, secure: false });
  return res.send({ User: user, accessToken: accessToken });
});

export default authRouter;
