import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = (req, res, next) => {
  const header = req.headers.authorization || "";
  console.log(header);
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  console.log(token);
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    console.log(decoded);
    req.user = decoded; // { id, role }
    next();
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ message: e.message });
  }
};

export const requireRole =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
