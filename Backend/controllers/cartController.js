import userModel from '../models/userModel.js'
import useModel from '../models/userModel.js'

//add itme to user cart

const addToCart = async(req,res)=>{
    try {
        // let userData = await userModel.findOne({_id : req.user._id})
        let userData = await userModel.findById(req.user._id)
        
        let cartData =  userData.cartData;

        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId ] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate( req.user._id, {cartData})

        res.json({success:true, message:"Added to cart"})
        } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
}

//remove itme to user cart

const removeFromCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.user._id)

        let cartData = userData.cartData;

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.user._id, {cartData})
        res.json({success : true, message : "Removed from cart"})
    } catch (error) {
        res.json({success : false, message : "Error"})
    }
}

//fetch user cart data

const getCart = async(req,res)=>{
    try {
        let userData = await userModel.findById(req.user._id)
        let cartData = userData.cartData  || {}
        res.json({success : true, cartData})
    } catch (error) {
        res.json({success : false, message : "Error"})
    }
}

export {addToCart, removeFromCart, getCart}