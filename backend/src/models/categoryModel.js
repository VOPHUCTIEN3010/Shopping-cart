import mongoose from 'mongoose'

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    timestamps: true
})

const Categories = mongoose.model("Categories", categoriesSchema) 
export default Categories;