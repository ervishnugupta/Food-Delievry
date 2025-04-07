import mongoose from "mongoose";
import bcrypt from "bcrypt"; // For password hashing

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            
        },
        cartData: {
            type: Object,
            default: {},
        },
    },
    {minimize : false});

// 🔐 Hash password before saving
userSchema.statics.hashPassword= async (password)=>{
    return bcrypt.hash(password, 10)
}


const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
