import ProductService from "../services/productService.js";
import { PRODUCTS_MESSAGES } from "../utils/message.js";
import { ObjectId } from "mongodb";


export const getProductsController = async (req, res) => {
    try {
        
        const products = await ProductService.getAllProducts();
        return res.status(200).json({
            message: PRODUCTS_MESSAGES.GET_PRODUCTS_SUCCESS,
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export const getProductDetailController = async (req, res) => {
    try {
        const productId =req.query._id;         
        const product = await ProductService.getProductById(productId);
        return res.status(200).json({
            message: PRODUCTS_MESSAGES.GET_PRODUCT_SUCCESS,
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export const createProductController = async (req, res) => {
    try {
        const product = req.body;        
        const createdProduct = await ProductService.createProduct(product);
        return res.status(201).json({
            message: PRODUCTS_MESSAGES.CREATE_PRODUCT_SUCCESS,
            data: createdProduct,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}