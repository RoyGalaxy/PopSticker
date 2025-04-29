import ProductModel from "../models/Product.js";
import { v2 as cloudinary } from "cloudinary";


// Add Prooduct
const addProduct = async (req, res) => {
    try {
        const { name, description, price, categories, sizes, tags } = req.body;
        
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(image => image !== undefined);

        let imageUrls = await Promise.all(
            images.map(async (image) => {
                const result = await cloudinary.uploader.upload(image.path, {
                    resource_type: "image",
                });

                return result.secure_url;
            })
        )
        
        const newProduct = new ProductModel({
            name,
            description,
            price: Number(price),
            categories: JSON.parse(categories),
            sizes : JSON.parse(sizes), // Assuming sizes is a valid JSO,
            tags: JSON.parse(tags), // Assuming tags is a valid JSON string,
            images: imageUrls,
        });

        await newProduct.save(); // Save the product t


        res.json({ success: true, message: "Product Added!!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

// Remove Product
const removeProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await ProductModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

// TODO: Update Product


// Get Product
const getProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        return res.status(200).json({ success: true, products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export { addProduct, removeProduct, getProduct, getAllProducts };