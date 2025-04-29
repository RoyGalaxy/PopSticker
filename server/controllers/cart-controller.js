import UserModel from "../models/User.js";

// Add products to cart
const addToCart = async (req,res) => {
    
    try{
        const {userId, itemId, size} = req.body;

        const user = await UserModel.findById(userId);
        if(!user) return res.status(404).json({message: "User not found"});
        
        const cartData = await user.cartData;

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1; 
            } else {
                cartData[itemId][size] = 1; 
            }
        } else {
            cartData[itemId] = {
                [size]: 1
            }
        }

        await UserModel.findByIdAndUpdate(userId, {cartData: cartData});

        return res.status(200).json({success: true, message: "Product added to cart"})
        
    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, message: err.message})
    }
}

// Update products in cart
const updateCart = async (req,res) => {
    try{
        const {userId, itemId, size, quantity} = req.body;

        const user = await UserModel.findById(userId);
        if(!user) return res.status(404).json({message: "User not found"});
        
        const cartData = await user.cartData;

        cartData[itemId][size] = quantity;

        await UserModel.findByIdAndUpdate(userId, {cartData: cartData});

        return res.status(200).json({success: true, message: "Cart Updated"})
    } catch (err) {
        console.log(err)
        res.status(500).json({success: false, message: err.message})
    }
}
// Get user cart
const getCart = async (req,res) => {
    try{

        const { userId } = req.body;

        const user = await UserModel.findById(userId);
        if(!user) return res.status(404).json({message: "User not found"})
            
        const cartData = await user.cartData;

        return res.status(200).json({success: true, cartData})
    
    } catch (err) {
        console.log(err)
        res.status(500).json({message: err.message})
    }
}

export {
    addToCart,
    updateCart,
    getCart 
}