import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js';

const authMiddleware = async (req, res, next)=>{
    try {
        // const token = req.headers;
        // const token = req.header('Authorization');

        const authHeader = req.header('Authorization');
        const token = authHeader && authHeader.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ message: 'Not authorized. Login again' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id).select('-password');

        // req.body.userId = user._id;
        req.user = user;
        
        if (!req.user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        next();
    } catch (error) {
        return res.status(401).json({success : false, message: 'Invalid token.' });
    }
}

export default authMiddleware