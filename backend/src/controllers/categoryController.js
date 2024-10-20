import categoryService from "../services/categoryService.js";

export const getCategoriesController = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.status(200).json({
            message: "get all categories",
            categories: categories
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getCategoryDetailController = async (req, res) => {
    try {
        const categoryId = req.params.id;        
        const category = await categoryService.getCategoryById(categoryId)        
        res.status(200).json({
            message: "get category details",
            category: category
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const createCategoryController = async (req, res) => { 
    try {
        const {name} = req.body;                
        const category = await categoryService.createCategory(name)        
        return res.status(200).json({
            message: "Category created successfully",
            category: category
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id;        
        await categoryService.deleteCategoryById(categoryId)        
        return res.status(200).json({
            message: "Category deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateCategoryController = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const data = req.body;                
        
        const updatedCategory = await categoryService.updateCategoryById(categoryId, data)        
        return res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}