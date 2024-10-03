import { CategoryLoader } from "@/loader/CategoryLoader";
import { useGetAllQuizQuery } from "@/redux/features/quiz/quiz/quizApi";
import { useState, useEffect } from "react";
import QuizCard from "./QuizCard";
import { PaginationCard } from "@/lib/PaginationCard";
import { TQuiz } from "@/types/common.data";
import { HardDrive } from "lucide-react";

const Quizs = () => {
  const [page, setPage] = useState(1);
  const limit = 4;
  const { data, isLoading } = useGetAllQuizQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const total = data?.meta?.total ?? 0;
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (isLoading) setShowLoader(true);
    }, 300);

    return () => {
      clearTimeout(delay);
      setShowLoader(false); 
    };
  }, [isLoading]);

  return (
    <div className="mt-10">
      <h1 className="text-2xl text-center hind-siliguri-semibold mb-5">
        All Quiz
      </h1>

      <div>
        {data?.data?.length === 0 ? (
          <div className="flex items-center justify-center flex-col">
            <HardDrive size={40} className="text-gray-400" />
            <h1 className="text-gray-400">No Quiz Found</h1>
          </div>
        ) : (
          <>
            {showLoader && <CategoryLoader />} 
            {!isLoading && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-4xl mx-auto">
                  {data?.data?.map((quiz: TQuiz) => (
                    <QuizCard quiz={quiz} key={quiz._id} />
                  ))}
                </div>
                {total > limit && (
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
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quizs;
