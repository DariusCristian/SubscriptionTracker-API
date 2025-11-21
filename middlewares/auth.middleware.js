// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../Models/user.model.js";

const authorize = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ message: "Unauthorized", error: error.message });
    }
};

export default authorize;
