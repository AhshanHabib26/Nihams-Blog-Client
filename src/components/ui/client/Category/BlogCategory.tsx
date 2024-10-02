import { CategoryLoader } from "@/loader/CategoryLoader";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types/common.data";
import BlogCategoryCard from "./BlogCategoryCard";

const BlogCategory = () => {
  const { data, isLoading } = useGetAllCategoriesQuery({});

  return (
    <div className="shadow bg-gray-50 rounded-md glassmorphism mt-8">
      <div className="bg-white rounded-t-md text-gray-600 text-center p-2 shadow">
        <h1 className="text-lg hind-siliguri-semibold">জনপ্রিয় ক্যাটেগরি</h1>
      </div>
      <div className="p-4">
        {isLoading ? (
          <CategoryLoader />
        ) : (
          <div>
            {data?.data?.map((category: TCategory) => (
              <BlogCategoryCard category={category} key={category._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCategory;
