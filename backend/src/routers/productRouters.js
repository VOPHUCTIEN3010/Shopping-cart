import express from "express";
import {
    createProductController,
    getProductsController,
    getProductDetailController,
    updateProductController,
    deleteProductController
} from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";

const routerProduct = express.Router();

routerProduct.get("/products", getProductsController);
routerProduct.get("/productDetail/:id", getProductDetailController);

routerProduct.put(
    "/updateProduct/:id",
    auth,
    authAdmin,
    updateProductController
);

routerProduct.delete(
    "/deleteProduct/:id",
    auth,
    authAdmin,
    deleteProductController
);

routerProduct.post(
    "/createProduct",
    auth,
    authAdmin,
    createProductController
);

export default routerProduct;
