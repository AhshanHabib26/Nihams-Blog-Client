import Blogs from "@/components/ui/client/Blogs/Blogs";
import Container from "@/lib/Container";
import PopularBlogs from "@/components/ui/client/Blogs/PopularBlogs";
import BlogCategory from "@/components/ui/client/Category/BlogCategory";

const HomePage = () => {
  return (
    <div>
      <div className="py-12">
        <Container>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-8">
              <Blogs />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <PopularBlogs />
              <div>
                <BlogCategory />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
