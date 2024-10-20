import { databaseService } from "./databaseServices.js";
import { PRODUCTS_MESSAGES } from "../utils/message.js";
import { ObjectId } from "mongodb";

const ProductService = {
    getAllProducts: async () => {        
        const products = await databaseService.products.find().toArray();
        return products;
    },
    getProductById: async (productId) => {
        const product = await databaseService.products.findOne({
            _id: new ObjectId(productId),
        });
        
        if (!product) {
            throw new Error(PRODUCTS_MESSAGES.PRODUCT_NOT_FOUND);
        }
        return product;
    },
    createProduct: async (product) => {       
        const result = await databaseService.products.insertOne(product);
        return result;
    },
    updateProductById: async (productId, productData) => {
        const updatedProduct = await databaseService.products.updateOne(
            { _id: productId },
            { $set: productData }
        );
        return updatedProduct;
    },
    deleteProductById: async (productId) => {
        const result = await databaseService.products.deleteOne({
            _id: productId,
        });
    },
};

export default ProductService;