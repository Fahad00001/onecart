import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token, please login again" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!verifyToken) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // Optionally verify admin from token payload, e.g.:
    // if (verifyToken.email !== process.env.ADMIN_EMAIL) return res.status(403).json({ message: "Forbidden" });

    req.adminEmail = process.env.ADMIN_EMAIL;

    next();
  } catch (error) {
    console.log("adminAuth error:", error);
    return res
      .status(500)
      .json({ message: `adminAuth Error: ${error.message}` });
  }
};

export default adminAuth;
