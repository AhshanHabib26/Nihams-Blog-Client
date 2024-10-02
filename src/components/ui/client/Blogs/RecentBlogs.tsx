import { CategoryLoader } from "@/loader/CategoryLoader";
import { useGetAllPostQuery } from "@/redux/features/post/postApi";
import { TBlog } from "@/types/common.data";
import RecentBlogsCard from "./RecentBlogsCard";

const RecentBlogs = () => {
  const { data, isLoading } = useGetAllPostQuery({});
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1); 

  // Filter for recent blogs created in the last 24 hours
  const recentBlogs = data?.data
    ? [...data.data]
        .filter((post: TBlog) => {
          if (post.createdAt) {
            const createdAt = new Date(post.createdAt);
            return createdAt >= yesterday && createdAt <= today; 
          }
          return false; 
        })
        .slice(0, 10) 
    : [];

  // If no recent blogs found, get random 10 posts from the available data
  const randomBlogs = data?.data
    ? [...data.data]
        .sort(() => 0.5 - Math.random()) // Shuffle the posts randomly
        .slice(0, 10) // Take the top 10 random posts
    : [];

  // Determine which blogs to display
  const blogsToDisplay = recentBlogs.length > 0 ? recentBlogs : randomBlogs;

  return (
    <div className="shadow bg-gray-50 rounded-md glassmorphism">
      <div className="bg-white rounded-t-md text-gray-600 text-center p-2 shadow">
        <h1 className="text-lg hind-siliguri-semibold">সাম্প্রতিক পোষ্ট</h1>
      </div>
      <div className="p-4">
        {isLoading ? (
          <CategoryLoader />
        ) : (
          <div>
            {blogsToDisplay.length > 0 ? (
              blogsToDisplay.map((post: TBlog, index) => (
                <RecentBlogsCard
                  post={post}
                  key={post._id}
                  isLast={index === blogsToDisplay.length - 1}
                />
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentBlogs;
