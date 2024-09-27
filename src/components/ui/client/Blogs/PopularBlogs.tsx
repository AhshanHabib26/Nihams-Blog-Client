import { getBlogsData } from "@/data/blogsData";
import PopularBlogCard from "./PopularBlogCard";
import { TBlog } from "@/types/common.data";

const PopularBlogs = () => {
  const blogs = getBlogsData();
  const topBlogs = blogs
  .sort((a: TBlog, b: TBlog) => b.viewsCount - a.viewsCount) 
  .slice(0, 10); 

  return (
    <div className="border border-gray-200 rounded-md">
       <div className="bg-white rounded-t-md text-gray-600 text-center p-2 shadow">
       <h1 className="text-lg hind-siliguri-semibold">জনপ্রিয় পোষ্ট</h1>
       </div>
     <div className="p-2">
     {topBlogs.map((blog: TBlog, index) => (
        <PopularBlogCard
          blog={blog}
          key={blog._id}
          index={index}
          isLast={index === topBlogs.length - 1}
        />
      ))}
     </div>
    </div>
  );
};

export default PopularBlogs;
