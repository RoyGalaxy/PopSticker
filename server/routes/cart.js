import express from 'express';
import authUser from '../middleware/auth.js';
import { addToCart, getCart, updateCart } from '../controllers/cart-controller.js';

const cartRouter = express.Router();

cartRouter.post('/add',authUser,  addToCart);
cartRouter.post('/update', authUser,  updateCart);
cartRouter.post('/get', authUser,  getCart);

export default cartRouter;