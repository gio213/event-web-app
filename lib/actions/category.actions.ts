"use server"

import { CreateCategoryParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../mongodb/database";
import Category from "../mongodb/database/models/category.model";


export const createCategory = async ({ categoryName }: CreateCategoryParams) => {
    try {
        await connectToDatabase();

        const newCategory = await Category.create({ categoryName });

        return JSON.parse(JSON.stringify(newCategory));

    } catch (error) {
        console.error(error);
        handleError(error);
        throw error; // Rethrow the error after handling it
    }
};

export const getAllCategories = async () => {
    try {
        await connectToDatabase();

        const categories = await Category.find();

        return JSON.parse(JSON.stringify(categories));

    } catch (error) {
        console.error(error);
        handleError(error);
    }
};