import MainLayout from "@/layout/Client/MainLayout";
import { DashboardLayout } from "@/layout/Dashboard/DashboardLayout";
import ProtectedRoute from "@/layout/Dashboard/ProtectedRoute";
import BlogPage from "@/pages/Client/Blog";
import CategoryPage from "@/pages/Client/Category";
import HomePage from "@/pages/Client/Home";
import LoginPage from "@/pages/Client/Login";
import RegisterPage from "@/pages/Client/Register";
import { AddCategoryPage } from "@/pages/Dashboard/Admin/AddCategory";
import { AnalyticsPage } from "@/pages/Dashboard/Admin/Analytics";
import { CommentPage } from "@/pages/Dashboard/Admin/Comment";
import { CreatePostPage } from "@/pages/Dashboard/Admin/CreatePost";
import DAHomePage from "@/pages/Dashboard/Admin/Home";
import { PostPage } from "@/pages/Dashboard/Admin/Post";
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
        element: <CategoryPage/>,
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
        path: "add-category",
        element: <AddCategoryPage />,
      },
      {
        path: "comments",
        element: <CommentPage />,
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
