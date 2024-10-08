import CommentsCard from "@/components/ui/client/Blogs/CommentsCard";
import PopularBlogs from "@/components/ui/client/Blogs/PopularBlogs";
import RecentBlogs from "@/components/ui/client/Blogs/RecentBlogs";
import SingleBlogCard from "@/components/ui/client/Blogs/SingleBlogCard";
import SingleBlogCommentBox from "@/components/ui/client/Blogs/SingleBlogCommentBox";
import BlogCategory from "@/components/ui/client/Category/BlogCategory";
import Container from "@/lib/Container";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetSinglePostQuery } from "@/redux/features/post/postApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { data, isLoading } = useGetSinglePostQuery(slug, {
    refetchOnMountOrArgChange: false,
  });

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="mt-10">
      <Container>
        <div>
          {!isLoading && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-8">
                <div>
                  {" "}
                  <SingleBlogCard post={data?.data} />
                  <div>
                    <SingleBlogCommentBox postId={data?.data?._id} />
                    <CommentsCard post={data?.data} />
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4">
                <RecentBlogs />
                <BlogCategory />
                <PopularBlogs />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
