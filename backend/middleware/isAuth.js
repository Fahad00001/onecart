import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log("🔐 Token from cookie:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("✅ Token verified:", verifyToken);

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    console.log("❌ isAuth error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default isAuth;
