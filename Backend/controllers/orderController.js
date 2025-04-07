import dotenv from 'dotenv';
dotenv.config();

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const FRONTEND_URL = "http://localhost:5173"

//placing user order for frontend
const placeOrder = async (req, res)=>{

    try {
        
        const newOrder = new orderModel({
            userId : req.user._id,
            items : req.body.items,
            amount : req.body.amount,
            address : req.body.address,
        
        })

        await newOrder.save()
        await userModel.findByIdAndUpdate(req.user._id , {cartData : {}});

        const line_items = req.body.items.map((item)=>({
            price_data : {
                currency : "inr",
                product_data : {
                    name : item.name,
                    
                },
                unit_amount : item.price*100*80
            },

            quantity : item.quantity
        }))

        line_items.push({
            price_data : {
                currency : "inr",
                product_data : {
                    name : "Delivery Charges",
                    
                },
                unit_amount : 5*100*80
            },
            quantity : 1
        })

        const session = await stripe.checkout.sessions.create({
            line_items : line_items,
            mode : 'payment',
            success_url : `${FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`

        })

        res.status(200).json({success : true , session_url : session.url})
    
    } catch (error) {
        res.status(200).json({success : false , message : "Error"})
    }
}

const verifyOrder = async (req, res)=>{
    const {orderId, success} = req.body;
    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment : true})
            res.status(200).json({success : true, message : "Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.status(400).json({success : false, message : "Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({success : false, message : "Error"})
        
    }
}
//user orders for frontend
const getUserOrders = async (req, res)=>{
    try {
        const orders = await orderModel.find({userId : req.user._id})
        res.status(200).json({success : true,data : orders})
    } catch (error) {
        console.log(error);
        res.status(400).json({success : false, message : "Error"})
        
    }
}

//user orders for admin panel
const getAllOrders = async (req, res)=>{
    try {
        const orders = await orderModel.find({})
        res.status(200).json({success : true,data : orders})
    } catch (error) {
        console.log(error);
        res.status(400).json({success : false, message : "Error"})
        
    }
}

//api for updating order status
const updateStatus = async(req, res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status : req.body.status})
        res.json({success : true , message : "Status updated"})
    } catch (error) {
        res.json({success : false , message : "Error"})
    }
}

export {placeOrder, verifyOrder, getUserOrders, getAllOrders, updateStatus}