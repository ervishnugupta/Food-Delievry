import mongoose from "mongoose";


const connectDB = () => {
    mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log("MongoDB connected successfully ✅"))
    .catch((error) => {
        console.error("MongoDB connection failed ❌", error);
        process.exit(1); // Exit process with failure
    });
};

export default connectDB;