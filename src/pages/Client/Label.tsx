import BlogCard from "@/components/ui/client/Blogs/BlogCard";
import PopularBlogs from "@/components/ui/client/Blogs/PopularBlogs";
import RecentBlogs from "@/components/ui/client/Blogs/RecentBlogs";
import BlogCategory from "@/components/ui/client/Category/BlogCategory";
import Container from "@/lib/Container";
import { PaginationCard } from "@/lib/PaginationCard";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetAllPostQuery } from "@/redux/features/post/postApi";
import { TBlog } from "@/types/common.data";
import { HardDrive } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const LabelPage = () => {
  const dispatch = useDispatch();
  const { tag } = useParams();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetAllPostQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const selectedTags = data?.data?.filter(
    (item) => tag && item?.tags?.includes(tag)
  );

  const total = data?.meta?.total ?? 0;

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="mt-10">
      <Container>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl hind-siliguri-semibold text-gray-600">
                  Label -{" "}
                </h1>
                <p className="text-2xl font-medium text-myBgPrimary">{tag}</p>
              </div>
              <hr className=" my-2 border-[0.5] border-dashed border-gray-200" />
              <div>
                <div>
                  {selectedTags && selectedTags?.length === 0 ? (
                    <div className="flex items-center justify-center flex-col mt-20">
                      <HardDrive size={40} className=" text-gray-400" />
                      <h1 className="text-gray-400">No Post Found</h1>
                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="mt-5">
                          {selectedTags &&
                            selectedTags?.map((post: TBlog) => (
                              <BlogCard post={post} key={post._id} />
                            ))}
                        </div>
                        {selectedTags && selectedTags.length > limit && (
                          <div className="my-5 flex items-end justify-end">
                            <PaginationCard
                              page={page}
                              limit={limit}
                              total={total}
                              onPageChange={(newPage) => setPage(newPage)}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <RecentBlogs />
            <BlogCategory />
            <PopularBlogs />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LabelPage;
