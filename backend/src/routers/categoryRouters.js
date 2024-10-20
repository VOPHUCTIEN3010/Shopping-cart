import express from "express";
import {
    createCategoryController,
    getCategoriesController,
    deleteCategoryController,
    updateCategoryController,
    getCategoryDetailController,
} from "../controllers/categoryController.js";
import auth from "../middlewares/auth.js";
import authAdmin from "../middlewares/authAdmin.js";
const routerCategory = express.Router();

routerCategory.get("/", getCategoriesController);
routerCategory.post("/addCategory", auth, authAdmin, createCategoryController);
routerCategory.get("/:id", getCategoryDetailController);

routerCategory.delete(
    "/deleteCategory/:id",
    auth,
    authAdmin,
    deleteCategoryController
);
routerCategory.put(
    "/updateCategory/:id",
    auth,
    authAdmin,
    updateCategoryController
);

export default routerCategory;
