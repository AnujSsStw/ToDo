import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { key } from "./index";

export function isAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  //   const token = req.cookies.coo;
  jwt.verify(token as string, key, (err, userId) => {
    if (err) {
      return res.send("go /login");
    } else {
      req.user = userId;
      return next();
    }
  });
}
