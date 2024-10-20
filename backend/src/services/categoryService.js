import Category from "../models/categoryModel.js";
import { databaseService } from "./databaseServices.js";
import { ObjectId } from "mongodb";

const categoryService = {
    getAllCategories: async () => {
        const categories = await databaseService.categories.find().toArray();
        return categories;
    },
    getCategoryById: async (categoryId) => {
        const category = await databaseService.categories.findOne({
            _id: new ObjectId(categoryId),
        });
        if (!category) {
            throw new Error("Category not found");
        }
        return category;
    },
    createCategory: async (name) => {
        const existingCategory = await databaseService.categories.findOne({
            name,
        });
        if (existingCategory) {
            return { message: "Category already exists" };
        }
        const { insertedId } = await databaseService.categories.insertOne({
            name,
        });
        return { message: "Category created", categoryId: insertedId };
    },
    updateCategoryById: async (categoryId, categoryData) => {
        const name = categoryData.name        
        const existingCategory = await databaseService.categories.findOne({
            name,
        });        
        if (existingCategory) {
            return { message: "Category already exists" };
        }        
        const updatedCategory = await databaseService.categories.updateOne(
            { _id: new ObjectId(categoryId) },
            { $set:  categoryData }
        );
        return updatedCategory;
    },
    deleteCategoryById: async (categoryId) => {
        const deletedCategory = await databaseService.categories.deleteOne({
            _id: new ObjectId(categoryId),
        });
        if (!deletedCategory) {
            throw new Error("Category not found");
        }
        return deletedCategory;
    },
};

export default categoryService;
