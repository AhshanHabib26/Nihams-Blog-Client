import MainLayout from "@/layout/Client/MainLayout";
import { DashboardLayout } from "@/layout/Dashboard/DashboardLayout";
import ProtectedRoute from "@/layout/Dashboard/ProtectedRoute";
import BlogPage from "@/pages/Client/Blog";
import CategoryPage from "@/pages/Client/Category";
import HomePage from "@/pages/Client/Home";
import LabelPage from "@/pages/Client/Label";
import LoginPage from "@/pages/Client/Login";
import QuizCategoryPage from "@/pages/Client/Quiz/QuizCategory";
import QuizDetails from "@/pages/Client/Quiz/QuizDetails";
import QuizLabelPage from "@/pages/Client/Quiz/QuizLabel";
import QuizSubmissionPage from "@/pages/Client/Quiz/QuizSubmission";
import RegisterPage from "@/pages/Client/Register";
import { AnalyticsPage } from "@/pages/Dashboard/Admin/Analytics";
import { AddCategoryPage } from "@/pages/Dashboard/Admin/Blog/AddCategory";
import { CommentPage } from "@/pages/Dashboard/Admin/Blog/Comment";
import { CreatePostPage } from "@/pages/Dashboard/Admin/Blog/CreatePost";
import { PostPage } from "@/pages/Dashboard/Admin/Blog/Post";
import DAHomePage from "@/pages/Dashboard/Admin/Home";
import { AllQuizCategoryPage } from "@/pages/Dashboard/Admin/Quiz/Category";
import { CreateQuizCategoryPage } from "@/pages/Dashboard/Admin/Quiz/CreateCategory";
import { CreateQuizPage } from "@/pages/Dashboard/Admin/Quiz/CreateQuiz";
import { AllQuizPage } from "@/pages/Dashboard/Admin/Quiz/Quiz";
import UserPage from "@/pages/Dashboard/Admin/User";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/blog/:slug",
        element: <BlogPage />,
      },
      {
        path: "/blog/category/:id",
        element: <CategoryPage />,
      },
      {
        path: "/blog/label/:tag",
        element: <LabelPage />,
      },
      {
        path: "/quiz/category/:id",
        element: <QuizCategoryPage />,
      },
      {
        path: "/quiz/label/:tag",
        element: <QuizLabelPage />,
      },
      {
        path: "/quiz/quiz-details/:id",
        element: <QuizDetails />,
      },
      {
        path: "/quiz/quiz-submission/:id",
        element: <QuizSubmissionPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute role="admin">
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DAHomePage />,
      },
      {
        path: "all-post",
        element: <PostPage />,
      },
      {
        path: "create-post",
        element: <CreatePostPage />,
      },
      {
        path: "create-post/:id",
        element: <CreatePostPage />,
      },
      {
        path: "post-category",
        element: <AddCategoryPage />,
      },
      {
        path: "comments",
        element: <CommentPage />,
      },
      {
        path: "all-quiz",
        element: <AllQuizPage />,
      },
      {
        path: "create-quiz",
        element: <CreateQuizPage />,
      },
      {
        path: "create-quiz/:id",
        element: <CreateQuizPage />,
      },
      {
        path: "create-category",
        element: <CreateQuizCategoryPage />,
      },
      {
        path: "create-category/:id",
        element: <CreateQuizCategoryPage />,
      },
      {
        path: "quiz-category",
        element: <AllQuizCategoryPage />,
      },
      {
        path: "all-user",
        element: <UserPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsPage />,
      },
    ],
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
