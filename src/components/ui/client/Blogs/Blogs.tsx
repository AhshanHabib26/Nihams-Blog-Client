import { getBlogsData } from "@/data/blogsData";
import SearchBtn from "../SearchBtn";
import BlogCard from "./BlogCard";
import { TBlog } from "@/types/common.data";

const Blogs = () => {
  const blogs = getBlogsData();

  return (
    <div>
      <SearchBtn />
      <div className="mt-5">
        {blogs.slice(0,5).map((blog: TBlog) => (
          <BlogCard blog={blog} key={blog._id}/>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
