/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { Trash2 } from "lucide-react";
import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useCreatePostMutation,
  useGetSinglePostQuery,
  useUpdatePostMutation,
} from "@/redux/features/post/postApi";
import { TResponse } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLoader } from "@/loader/DashboardLoader";
import { CategoryLoader } from "@/loader/CategoryLoader";

// Define the types for API responses and form data
interface Category {
  id: string;
  title: string;
}

export const CreatePostPage = () => {
  const [imageError, setImageError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [postId, setPostId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Fetch single post data if ID is available
  const { data: post, isFetching: isFetchingPost } = useGetSinglePostQuery(
    id || "",
    {
      skip: !id,
    }
  );

  // Fetch all categories
  const {
    data: categoriesData,
    isFetching: isFetchingCategories,
    isError: isErrorCategories,
  } = useGetAllCategoriesQuery("");

  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  // Memoize categories to avoid unnecessary recalculations
  const categories = useMemo<Category[]>(
    () =>
      categoriesData?.data?.map((item) => ({
        id: item._id,
        title: item.title,
      })) || [],
    [categoriesData]
  );

  // Set form fields when post data is fetched
  useEffect(() => {
    if (post) {
      setTitle(post?.data?.title || "");
      setDescription(post?.data?.description || "");
      setSelectedCategory(post?.data?.category._id || "");
      setImagePreview(post?.data?.photo || "");
      setAvatar(post?.data?.avatar || "");
      setPostId(post?.data?._id || null);
      setPhoto(null);
    }
  }, [post]);

  // Handle category change
  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
  }, []);

  // Handle file input change
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.currentTarget.files?.[0];
      if (!file) return;

      // Validate file size and type
      if (file.size > 1048576) {
        setImageError("File size exceeds 1MB");
        return;
      }

      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        setImageError("Invalid file type");
        return;
      }

      setImageError(null);
      setPhoto(file);
      setImagePreview(URL.createObjectURL(file));
    },
    []
  );

  // Remove image preview
  const removeImage = useCallback(() => {
    setPhoto(null);
    setImagePreview(null);
  }, []);

  // Quill editor modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  if (isFetchingPost) {
    return <DashboardLoader />;
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!title || !description || !selectedCategory) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", selectedCategory);
    formData.append("avatar", avatar);

    if (photo) {
      formData.append("file", photo);
    }

    const toastId = toast.loading(
      postId ? "Post updating..." : "Post creating..."
    );

    try {
      const response = postId
        ? ((await updatePost({ id: postId, data: formData })) as TResponse<any>)
        : ((await createPost(formData)) as TResponse<any>);

      if (response.error) {
        toast.error(response.error.data.message, {
          id: toastId,
          duration: 1500,
        });
      } else {
        toast.success(
          postId ? "Post updated successfully" : "Post created successfully",
          {
            id: toastId,
            duration: 1000,
          }
        );
        resetForm();
        navigate("/dashboard/all-post");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(`Error: ${errorMessage}`, { id: toastId, duration: 1500 });
    }
  };

  // Reset form fields
  const resetForm = () => {
    setPhoto(null);
    setImagePreview(null);
    setDescription("");
    setTitle("");
    setSelectedCategory("");
    setPostId(null);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-lg">
        {!imagePreview && (
          <div className="flex justify-center items-center">
            <input
              id="images"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="images"
              className="cursor-pointer bg-slate-700 text-white px-4 py-3 rounded shadow hover:bg-slate-600"
            >
              Choose a file
            </label>
          </div>
        )}

        {imageError && <p className="text-sm text-red-600">{imageError}</p>}

        {imagePreview && (
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-[800px] h-[250px] rounded-lg"
            />
            <button
              onClick={removeImage}
              className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1"
              aria-label="Remove Image"
            >
              <Trash2 className="text-red-500" />
            </button>
          </div>
        )}
      </div>
      <div>
        <Input
          className="h-[50px] mt-5"
          placeholder="Enter image URL ( Leave empty if uploading a file)"
          type="text"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </div>
      <div className="my-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Input
          className="h-[50px]"
          type="text"
          placeholder="Enter your title"
          aria-label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          {isErrorCategories && <p>Error loading categories.</p>}

          {isFetchingCategories ? (
            <CategoryLoader />
          ) : (
            <Select
              value={selectedCategory || ""}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="h-[50px]" aria-label="Category">
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent>
                {isFetchingCategories && (
                  <SelectItem value="loading" disabled>
                    Loading...
                  </SelectItem>
                )}
                {isErrorCategories && (
                  <SelectItem value="error" disabled>
                    Error loading categories
                  </SelectItem>
                )}
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="null" disabled>
                    No categories available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
      <div>
        <ReactQuill
          modules={modules}
          theme="snow"
          value={description}
          onChange={setDescription}
          className="h-[250px] flex flex-1 flex-col"
        />
      </div>
      <div className="mt-20 lg:mt-14">
        <Button type="button" onClick={handleSubmit} size="lg">
          {postId ? "Update Post" : "Add Post"}
        </Button>
      </div>
    </div>
  );
};
