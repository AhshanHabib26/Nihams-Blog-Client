
import QuizListCard from "@/components/ui/client/Quiz/QuizListCard";
import QuizListCategory from "@/components/ui/client/Quiz/QuizListCategory";
import Container from "@/lib/Container";
import { PaginationCard } from "@/lib/PaginationCard";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetAllQuizQuery } from "@/redux/features/quiz/quiz/quizApi";
import {  TQuiz } from "@/types/common.data";
import { HardDrive } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const QuizCategoryPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetAllQuizQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const selectedCategory = data?.data?.filter(
    (item) => item?.category?.name === id
  );

  const total = data?.meta?.total ?? 0;

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
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl hind-siliguri-semibold text-gray-600">
                      Quiz Category -{" "}
                    </h1>
                    <p className="text-2xl font-medium text-myBgPrimary">
                      {id}
                    </p>
                  </div>
                  <hr className=" my-2 border-[0.5] border-dashed border-gray-200" />
                  <div>
                    <div>
                      {selectedCategory && selectedCategory?.length === 0 ? (
                        <div className="flex items-center justify-center flex-col mt-20">
                          <HardDrive size={40} className=" text-gray-400" />
                          <h1 className="text-gray-400">No Quiz Found</h1>
                        </div>
                      ) : (
                        <>
                          <div>
                            <div className="mt-5">
                              {selectedCategory &&
                                selectedCategory?.map((quiz: TQuiz) => (
                                  <QuizListCard quiz={quiz} key={quiz._id} />
                                ))}
                            </div>
                            {selectedCategory &&
                              selectedCategory.length > limit && (
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
                <QuizListCategory />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default QuizCategoryPage;
