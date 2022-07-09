import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";

function signToken(tokenData: any) {
  return jwt.sign(tokenData, process.env.JWT_SECRET);
}

function verifyToken(tokenStr: unknown) {
  if (typeof tokenStr !== "string") return null;

  try {
    return jwt.verify(tokenStr, process.env.JWT_SECRET) as JWT;
  } catch (err) {
    return null;
  }
}

export { signToken, verifyToken };
