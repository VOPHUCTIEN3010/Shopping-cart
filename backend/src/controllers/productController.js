import ProductService from "../services/productService.js";
import { PRODUCTS_MESSAGES } from "../utils/message.js";


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
        const productId =req.params.id;         
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

export const updateProductController = async (req, res) => {
    try {
        const product = req.body;       
        const productId = req.params.id;        
        const updateProduct = await ProductService.updateProductById(productId,product);
        return res.status(201).json({
            message: PRODUCTS_MESSAGES.CREATE_PRODUCT_SUCCESS,
            data: updateProduct,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export const deleteProductController = async (req, res) => {
    try {
        const productId = req.params.id;        
        const result = await ProductService.deleteProductById(productId);
        return res.status(204).json({
            message: PRODUCTS_MESSAGES.DELETE_PRODUCT_SUCCESS,
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}