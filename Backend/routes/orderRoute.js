import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { placeOrder, verifyOrder, getUserOrders, getAllOrders, updateStatus } from '../controllers/orderController.js';

const route = express.Router()

route.post('/place', authMiddleware, placeOrder)
route.post('/verify', authMiddleware, verifyOrder)
route.post('/userorders', authMiddleware, getUserOrders )
route.get('/list', getAllOrders )
route.post('/status', updateStatus )

export default route