import Blogs from "@/components/ui/client/Blogs/Blogs";
import Container from "@/lib/Container";
import PopularBlogs from "@/components/ui/client/Blogs/PopularBlogs";

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
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
