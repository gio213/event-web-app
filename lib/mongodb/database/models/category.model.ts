import { Document, Schema, model, models } from "mongoose";

export interface ICategory extends Document {
    _id: string;
    categoryName: string;
}

const CategorySchema = new Schema({
    categoryName: { type: String, required: true, unique: true },
})

const Category = models.Category || model('Category', CategorySchema);

export default Category;