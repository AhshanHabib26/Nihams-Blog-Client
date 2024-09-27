/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostCard } from "@/components/ui/dashboard/admin/PostCard";
import { Separator } from "@/components/ui/separator";
import { PaginationCard } from "@/lib/PaginationCard";
import { DashboardLoader } from "@/loader/DashboardLoader";
import {
  useDeletePostMutation,
  useGetAllPostQuery,
} from "@/redux/features/post/postApi";
import { TResponse } from "@/types";
import { TPost } from "@/types/common.data";
import { HardDrive, ListPlus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const PostPage = () => {
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isFetching } = useGetAllPostQuery({ page, limit });
  const total = data?.meta?.total ?? 0;
  const [deletePost] = useDeletePostMutation();


  const deleteHandler = async (id: string) => {
    const toastId = toast.loading("Deleting...");

    try {
      const res = (await deletePost(id)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("Post deleted successfully", {
          id: toastId,
          duration: 1000,
        });
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? `Error: ${err.message}` : "Something went wrong";
      toast.error(errorMessage, { id: toastId, duration: 1500 });
    }
  };

  if (isFetching) {
    return (
      <div>
        <DashboardLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-end justify-end">
        <Link
          to="/dashboard/create-post"
          className="flex items-center bg-black text-white px-4 py-3 gap-2 rounded-lg text-md"
        >
          <ListPlus />
          New Post
        </Link>
      </div>
      <div>
        <Separator className="my-5" />

        {data?.data?.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-20">
            <HardDrive size={40} className=" text-gray-400" />
            <h1 className="text-gray-400">No Post Found</h1>
          </div>
        ) : (
          <div>
            <div>
              {data?.data?.map((post: TPost) => (
                <PostCard
                  post={post}
                  key={post._id}
                  deleteHandler={deleteHandler}
                />
              ))}
            </div>
            <div className="my-5">
              <PaginationCard
                page={page}
                limit={limit}
                total={total}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
