import React, { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/lib/mongodb/database/models/category.model";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.actions";

type DropDownProps = {
  value?: string;
  onChangeHandler: (value: string) => void;
};

const DropDownForm = ({ value, onChangeHandler }: DropDownProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = async () => {
    try {
      const trimmedCategoryName = newCategory.trim();
      if (!trimmedCategoryName) {
        // Handle empty category name if needed
        return;
      }

      const category = await createCategory({
        categoryName: trimmedCategoryName,
      });
      setCategories((prevState) => [...prevState, category]);
    } catch (error) {
      console.error("Error adding category:", error);
      // Handle the error appropriately, e.g., show a notification to the user
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoryList = await getAllCategories();
        if (categoryList) {
          setCategories(categoryList as ICategory[]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              className="select-item p-regular-14"
              value={category._id}
              key={category._id}
            >
              {category.categoryName}
            </SelectItem>
          ))}
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text "
                  placeholder="Category name"
                  className="input-field mt-3 "
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default DropDownForm;
