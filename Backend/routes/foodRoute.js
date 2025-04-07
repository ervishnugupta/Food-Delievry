import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer'

const router = express.Router()

//Image storage Engine


import path from "path";

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Folder where files will be saved
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with storage
const upload = multer({ storage: storage });


router.post('/add',upload.single('image'), addFood)
router.get('/list' , listFood )
router.post('/remove', removeFood)

export default router