import express from "express";
import { getAllProducts, getProduct, addProduct, removeProduct } from "../controllers/product-controller.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/admin-auth.js";

const productRouter = express.Router();


productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", adminAuth ,upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);
productRouter.delete("/:id", adminAuth, removeProduct);

export default productRouter;