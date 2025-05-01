import express from "express";
import { placeOrder,  allOrders, userOrders, updateOrderStatus } from "../controllers/order-controller.js";
import adminAuth from "../middleware/admin-auth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

// Admin Routes
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateOrderStatus);

// Client Routes
orderRouter.post('/place', authUser ,placeOrder);
orderRouter.post('/user-orders', authUser, userOrders);

export default orderRouter;