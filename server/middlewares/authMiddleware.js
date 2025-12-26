// importing required modules
import jwt from "jsonwebtoken"

const protect = async (req, res, next) => {
    // getting token from headers
    const token = req.headers.authorization;

    // check if token is present
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    // verify token
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
export default protect;
