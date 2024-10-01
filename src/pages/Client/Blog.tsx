import CommentsCard from "@/components/ui/client/Blogs/CommentsCard";
import PopularBlogs from "@/components/ui/client/Blogs/PopularBlogs";
import SingleBlogCard from "@/components/ui/client/Blogs/SingleBlogCard";
import SingleBlogCommentBox from "@/components/ui/client/Blogs/SingleBlogCommentBox";
import Container from "@/lib/Container";
import { CategoryLoader } from "@/loader/CategoryLoader";
import { useGetSinglePostQuery } from "@/redux/features/post/postApi";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetSinglePostQuery(slug);
  return (
    <div className="mt-10">
      <Container>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8">
            {isLoading ? (
              <CategoryLoader />
            ) : (
              <div>
                {" "}
                <SingleBlogCard post={data?.data} />
                <div>
                  <SingleBlogCommentBox postId={data?.data?._id} />
                  <CommentsCard post={data?.data} />
                </div>
              </div>
            )}
          </div>
          <div className="col-span-12 lg:col-span-4">
            <PopularBlogs />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
