import jwt from "jsonwebtoken";
import User from "../models/User.js";

var authMiddleware = async (req, res, next) => {
    let token 
    const { authorization } = req.headers
    if (authorization && authorization.startsWith("Bearer")) { 
        try {
            token = authorization.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            console.error(error)
            res.status(401).json({ message: "token failed" })
            
        }
   }
   if (!token) {
         res.status(401).json({ message: "Not authorized, no token" })
    }
}

export default authMiddleware; 