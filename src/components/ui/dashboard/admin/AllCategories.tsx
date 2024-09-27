/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/features/category/categoryApi";
import { DashboardLoader } from "@/loader/DashboardLoader";
import { Eye, HardDrive, SquarePen, Tags, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { TResponse } from "@/types";
import { PaginationCard } from "@/lib/PaginationCard";
import { TCategory } from "@/types/common.data";

export interface AllCategoriesProps {
  onSelectCategory?: (id: string, name: string) => void;
}

export const AllCategories: React.FC<AllCategoriesProps> = ({
  onSelectCategory,
}) => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isFetching } = useGetAllCategoriesQuery({ page, limit });

  const total = data?.meta?.total ?? 0;
  const [deleteCategory] = useDeleteCategoryMutation();

  const deleteHandler = async (id: string) => {
    const toastId = toast.loading("Deleting...");

    try {
      const res = (await deleteCategory(id)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("Category deleted successfully", {
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


  const handleEdit = (id: string, name: string) => {
    onSelectCategory?.(id, name);
  };

  const renderTableRows = () => {
    return data?.data?.map((item: TCategory) => (
      <TableRow key={item._id}>
        <TableCell>
          <div className="flex items-center gap-2">
            <Tags size={22} color="#363636" />
           <p className="text-gray-600 text-lg hind-siliguri-medium"> {item.title}</p>
          </div>
        </TableCell>
        <TableCell className="flex items-center gap-3 justify-end cursor-pointer">
          <Eye size={20} color="#363636" />
          <SquarePen
            onClick={() => handleEdit(item._id, item.title)}
            size={20}
            color="green"
          />
          <Trash2
            onClick={() => deleteHandler(item._id)}
            size={20}
            color="red"
          />
        </TableCell>
      </TableRow>
    ));
  };

  if (isFetching) {
    return (
      <div>
        <DashboardLoader />
      </div>
    );
  }

  if (data?.data?.length === 0) {
    return <div className="flex items-center justify-center flex-col mt-20">
      <HardDrive size={40} className=" text-gray-400" />
      <h1 className="text-gray-400">No Category Found</h1>
    </div>;
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderTableRows()}</TableBody>
      </Table>
      <div className="my-5">
        <PaginationCard
          page={page}
          limit={limit}
          total={total}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
};
