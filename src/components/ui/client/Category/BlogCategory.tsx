import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { TCategory } from "@/types/common.data";
import BlogCategoryCard from "./BlogCategoryCard";
import { useEffect } from "react";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useDispatch } from "react-redux";

const BlogCategory = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllCategoriesQuery(
    {},
    {
      refetchOnMountOrArgChange: false,
    }
  );

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="shadow-md border-[0.5px] border-gray-200 rounded-md  mt-5">
      <div className="bg-white rounded-t-md text-gray-600 p-2 shadow-sm">
        <h1 className="text-lg hind-siliguri-semibold ml-2">All Category</h1>
      </div>
      <div className="p-4">
        <div>
          {data?.data?.map((category: TCategory) => (
            <BlogCategoryCard category={category} key={category._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCategory;
