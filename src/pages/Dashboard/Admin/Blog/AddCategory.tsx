/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { AllCategories } from "@/components/ui/dashboard/admin/Blog/AllCategories";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/features/category/categoryApi";
import { TResponse } from "@/types";
import { useState } from "react";
import { toast } from "sonner";

export const AddCategoryPage = () => {
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();



  // Handler for creating a category
  const createHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Creating...");

    if (!category) {
      return toast.error("Category name required", {
        id: toastId,
        duration: 1500,
      });
    }

    const categoryData = { title: category };

    try {
      const res = (await createCategory(categoryData)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("Category added successfully", {
          id: toastId,
          duration: 1000,
        });
        setCategory("");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`, { id: toastId, duration: 1500 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 1500 });
      }
    }
  };

  // Handler for updating a category
  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Updating...");

    if (!category || categoryId === null) {
      return toast.error("Category ID and name required", {
        id: toastId,
        duration: 1500,
      });
    }

    const categoryData = { title: category };

    try {
      const res = (await updateCategory({
        id: categoryId,
        data: categoryData,
      })) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("Category updated successfully", {
          id: toastId,
          duration: 1000,
        });
        setCategory("");
        setCategoryId(null);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`, { id: toastId, duration: 1500 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 1500 });
      }
    }
  };

  return (
    <div>
      <form onSubmit={categoryId === null ? createHandler : updateHandler}>
        <div className="flex items-center max-w-xl mx-auto gap-2">
          <Input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            type="text"
            name="title"
            className="h-[50px] text-lg text-gray-600 placeholder:text-gray-400"
            placeholder="Category Name"
          />
          {categoryId === null ? (
            <Button className="h-[50px] bg-orange-600 hover:bg-orange-500">Add Category</Button>
          ) : (
            <Button className="h-[50px] bg-green-600 hover:bg-green-500">Update Category</Button>
          )}
        </div>
      </form>
      <Separator className="mt-5" />
      <div>
        <AllCategories
          onSelectCategory={(id, name) => {
            setCategoryId(id);
            setCategory(name);
          }}
        />
      </div>
    </div>
  );
};
