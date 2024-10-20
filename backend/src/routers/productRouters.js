import express from "express";
import {
    createProductController,
    getProductsController,
    getProductDetailController
} from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";
const routerProduct = express.Router();

routerProduct
    .get("/products", getProductsController)
    .get("/productDetail", getProductDetailController)
    .post("/createProduct", auth, authAdmin, createProductController);

export default routerProduct;
