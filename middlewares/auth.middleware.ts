import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "../load_envs";

const JWT_SECRET = process.env.JWT_SECRET_TOKEN || "default_secret_key";

// Extend the Request type to include the custom userId property
interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  console.log("Token from middleware:", token);

  if (!token) {
    res.status(401).json({ error: "Unauthorized: Missing token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};
