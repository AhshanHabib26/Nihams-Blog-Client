import { CategoryLoader } from "@/loader/CategoryLoader";
import { useGetAllQuizCategoriesQuery } from "@/redux/features/quiz/category/categoryApi";
import QuizCategoryCard from "./QuizCategoryCard";
import { TQuizCategory } from "@/types/common.data";

const QuizCategory = () => {
  const { data, isLoading } = useGetAllQuizCategoriesQuery({});

  return (
    <div className=" mt-10">
      <h1 className="text-2xl text-center hind-siliguri-semibold mb-5">
        Quiz Category
      </h1>
      <div>
        {isLoading ? (
          <CategoryLoader />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {data?.data?.slice(0, 12).map((category: TQuizCategory, index) => (
              <QuizCategoryCard
                category={category}
                key={category._id}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizCategory;
