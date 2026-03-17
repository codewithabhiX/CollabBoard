import JWT from "jsonwebtoken";
import UserModel from "../src/modules/user/models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader); // Debugging log

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1].trim();

    const decoded = JWT.verify(token, process.env.ACCESS_SECRET_TOKEN);

    const user = await UserModel.findById(decoded.id).select(
      "_id name email"
    );

    console.log('user found in auth middleware:', user); // Debugging log

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Access denied, Invalid user",
      });
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authMiddleware;