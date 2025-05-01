import OrderModel from "../models/Order.js";




// Place order using razorpay
const placeOrder = async (req, res) => {
    try {
        const { paymentMethod ,totalAmount, userId, items, address } = req.body;
        // console.log(paymentMethod, totalAmount, userId, items, address);
        const order = await OrderModel.create({
            userId: userId,
            items,
            amount: totalAmount,
            address: address,
            paymentMethod,
            payment: true,
        })

        await order.save();
        res.status(200).json({success:true, message:"Order Placed Successfully"});
    } catch (error) {
        console.log(error);
    }
}

// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await OrderModel.find({}).sort({ createdAt: -1 });
        res.status(200).json({success:true, orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message}); // error message
    }
}

//  user order data for frontend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json({success:true, orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message}); 
    }
}

// update order status only admin panel
const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await OrderModel.findByIdAndUpdate(orderId, { status });
        res.status(200).json({success:true, message:"Order Status Updated"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message}); // error message
    }
}

export {
    placeOrder,
    allOrders,
    userOrders,
    updateOrderStatus
}