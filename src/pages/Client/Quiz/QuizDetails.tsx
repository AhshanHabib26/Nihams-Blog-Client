/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { DashboardLoader } from "@/loader/DashboardLoader";
import { useNavigate, useParams } from "react-router-dom";
import avatar from "../../../assets/images/quizDetailsImg.jpg";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { FaQuestion } from "react-icons/fa6";
import { toast } from "sonner";
import { useGetSingleQuizQuery, useSubmitQuizMutation } from "@/redux/features/quiz/quiz/quizApi";
import Container from "@/lib/Container";

export interface Question {
  _id: string;
  questionText: string;
  options: string[];
  correctOption: string;
  explanation: string;
}

const QuizDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [isToggled, setIsToggled] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string;
  }>({});
  const [reviewMode, setReviewMode] = useState(false);
  const [timer, setTimer] = useState<number>(0);
  const [retakeCount, setRetakeCount] = useState<number>(0);
  const { data, isFetching } = useGetSingleQuizQuery(id);
  const [submitQuiz] = useSubmitQuizMutation();

  useEffect(() => {
    if (isToggled) {
      const quizDuration = data?.data?.duration || 0;
      setTimer(quizDuration * 60); // Convert minutes to seconds
    }
  }, [isToggled, data?.data?.duration]);

  useEffect(() => {
    if (timer <= 0) {
      if (isToggled) {
        handleTimeEnd();
      }
      return;
    }

    const timerInterval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [timer, isToggled]);

  if (isFetching) {
    return (
      <div>
        <DashboardLoader />
      </div>
    );
  }

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
    if (!isToggled) {
      setTimer(data?.data?.duration * 60); // Restart timer on new quiz
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSelectedAnswers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < data.data.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setReviewMode(true);
    }
  };

  const handleReview = () => {
    setReviewMode(false);
    setCurrentQuestionIndex(0);
  };

  const handleSubmit = async () => {
    // Convert selected answers to the desired structure
    const userAnswers = Object.keys(selectedAnswers).map((questionKey) => {
      const questionIndex = parseInt(questionKey.split("-")[1], 10);
      return {
        questionIndex,
        selectedOption: selectedAnswers[questionKey],
      };
    });

    try {
      // Send userAnswers directly in the body
      const response = await submitQuiz({
        id: data.data._id,
        data: userAnswers, // Pass userAnswers directly
      }).unwrap();
      const { totalQuestions, totalMarks, correctCount, submission } =
        response.data;

      console.log(response.data);

      const result = await Swal.fire({
        title: "Quiz Submitted",
        html: `
    <p style="font-size: 20px; color: #333; margin: 0;">Total Questions: ${totalQuestions}</p>
    <p style="font-size: 20px; color: #333; margin: 0;">Total Marks: ${totalMarks}</p>
    <p style="font-size: 20px; color: #333; margin: 0;">Correct Answers: ${correctCount}</p>
  `,
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "See Details",
      });

      if (result.isConfirmed) {
        // Handle OK button click
        navigate("/"); // Navigate to home or another page
      } else if (result.isDismissed) {
        // Handle See Details button click
        navigate(`/quiz-submission/${submission._id}`); // Navigate to details page with quiz ID
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(`Error: ${errorMessage}`);
    }
  };

  const handleTimeEnd = () => {
    Swal.fire({
      title: "Time’s up!",
      text: "The quiz time has ended.",
      icon: "info",
      showDenyButton: true,
      confirmButtonText: retakeCount < 2 ? "Retake Quiz" : "Return Home",
      denyButtonText: "Quiz Page",
    }).then((result) => {
      if (result.isConfirmed) {
        if (retakeCount < 2) {
          setRetakeCount((prev) => prev + 1);
          setIsToggled(false);
          setTimer(data?.data?.duration * 60);
          setCurrentQuestionIndex(0);
          setReviewMode(false);
        }
      } else if (result.isDenied || result.isDismissed) {
        if (result.isDenied || result.isDismissed) {
          navigate("/");
        }
      }
    });
  };

  const currentQuestion = data.data.questions[currentQuestionIndex];

  return (
    <div className="mt-10">
      <Container>
        <div className="max-w-4xl mx-auto w-full ">
          {!isToggled && (
            <div className="flex flex-col lg:flex-row gap-5 border border-gray-200 rounded-md p-4">
              <div className="flex items-center lg:items-start justify-center">
                <img
                  className="w-full lg:w-[400px] h-[250px] rounded-md"
                  src={avatar}
                  alt={data?.data?.title}
                />
              </div>

              <div className="w-full">
                <h1 className="text-md hind-siliguri-medium text-gray-700">
                  Title:{" "}
                  <span className=" hind-siliguri-semibold">
                    {data?.data?.title}
                  </span>
                </h1>

                <div className="flex gap-1 text-md hind-siliguri-medium text-gray-700">
                  Description:{" "}
                  {data?.data?.description && (
                    <p
                      className=" hind-siliguri-light"
                      dangerouslySetInnerHTML={{
                        __html: data.data.description,
                      }}
                    ></p>
                  )}
                </div>
                <p className="text-md hind-siliguri-medium text-gray-700">
                  Duration:{" "}
                  <span className=" hind-siliguri-light">
                    {data?.data?.duration} Minutes
                  </span>
                </p>
                <p className="text-md hind-siliguri-medium text-gray-700">
                  Level:{" "}
                  <span className=" hind-siliguri-light">
                    {data?.data?.difficultyLevel}
                  </span>
                </p>
                <p className="text-md hind-siliguri-medium text-gray-700">
                  Category:{" "}
                  <span className=" hind-siliguri-light">
                    {data?.data?.category?.name}
                  </span>
                </p>
                <div className="flex items-center gap-1 text-md hind-siliguri-medium text-gray-700">
                  <p>Tags: </p>
                  {data.data.tags.map((t: string, index: number) => (
                    <div key={index}>
                      <p className=" hind-siliguri-light border-[0.5px] border-dashed p-1 text-sm border-gray-400 rounded">
                        {t}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex items-end justify-end">
                  <Button
                    size="lg"
                    className="bg-gray-800 hover:bg-gray-700"
                    onClick={handleToggle}
                  >
                    Start Now
                  </Button>
                </div>
              </div>
            </div>
          )}

          {isToggled && (
            <div className="mt-5">
              {!reviewMode ? (
                <div className="border border-gray-200 rounded-md p-4 relative">
                  <div>
                    <p
                      className={`absolute top-0 right-0 w-[140px] py-1 text-center text-lg text-white hind-siliguri-light rounded-tr-sm ${
                        timer > 0 ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {isToggled &&
                        `Time Left: ${Math.floor(timer / 60)
                          .toString()
                          .padStart(2, "0")}:${(timer % 60)
                          .toString()
                          .padStart(2, "0")}`}
                    </p>

                    <div>
                      <span className="text-md bg-gray-700 text-white py-1 px-2 font-light inline-block rounded">
                        Question {currentQuestionIndex + 1} of{" "}
                        {data.data.questions.length}
                      </span>
                      <div className="flex items-start lg:items-center gap-1 my-2">
                        <FaQuestion size={18} className="text-red-600" />
                        <h1 className="text-lg hind-siliguri-semibold">
                          {currentQuestion.questionText}
                        </h1>
                      </div>
                    </div>
                    <div>
                      {currentQuestion.options.map(
                        (option: string, i: number) => (
                          <div key={i}>
                            <label className="flex items-center gap-2 text-lg">
                              <input
                                type="radio"
                                name={`question-${currentQuestionIndex}`}
                                value={option}
                                checked={
                                  selectedAnswers[
                                    `question-${currentQuestionIndex}`
                                  ] === option
                                }
                                onChange={handleOptionChange}
                              />
                              {option}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="flex items-end justify-end">
                    <button
                      onClick={handleNextQuestion}
                      className="mt-2 px-6 py-2 bg-orange-600 text-white rounded"
                    >
                      {currentQuestionIndex < data.data.questions.length - 1
                        ? "Next"
                        : "Review"}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-center text-xl hind-siliguri-semibold text-gray-600">
                    Review Your Answers
                  </h2>
                  {data?.data?.questions.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-md p-4 mt-5"
                    >
                      <h3 className="text-xl hind-siliguri-semibold">
                        {item.questionText}
                      </h3>
                      <div>
                        {item.options.map((option: string, i: number) => (
                          <div key={i}>
                            <label className="flex items-center gap-2 text-lg">
                              <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                checked={
                                  selectedAnswers[`question-${index}`] ===
                                  option
                                }
                                disabled
                              />
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleSubmit}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleReview}
                    className="mt-4 ml-4 px-4 py-2 bg-gray-600 text-white rounded"
                  >
                    Go Back
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default QuizDetails;
