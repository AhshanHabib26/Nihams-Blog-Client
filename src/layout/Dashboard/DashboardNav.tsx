import {
  Bell,
  Blocks,
  CopyPlus,
  Home,
  LineChart,
  ListPlus,
  Menu,
  MessageCircleMore,
  SquareArrowLeft,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, Outlet } from "react-router-dom";

const DashboardNav = () => {
  return (
    <div>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 font-semibold"
              >
                <Blocks className="h-5 w-5" />
                <span className="">Nihams Blog</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/all-post"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <CopyPlus className="h-4 w-4" />
                  All Post{" "}
                </Link>
                <Link
                  to="/dashboard/add-category"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <ListPlus className="h-4 w-4" />
                  Add Category{" "}
                </Link>
                <Link
                  to="/dashboard/comments"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <MessageCircleMore className="h-4 w-4" />
                  Comments{" "}
                </Link>
                <Link
                  to="/dashboard/all-user"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Users className="h-4 w-4" />
                  Users
                </Link>
                <Link
                  to="/dashboard/analytics"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <LineChart className="h-4 w-4" />
                  Analytics
                </Link>
                <Link
                  to="/"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <SquareArrowLeft className="h-4 w-4" />
                  Back Home
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col w-[300px] sm:w-[300px]"
              >
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Blocks className="h-5 w-5" />
                    <span className="">Nihams Blog</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 font-normal rounded-lg px-2  text-muted-foreground transition-all hover:text-primary"
                  >
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/all-post"
                    className="flex items-center gap-2 font-normal rounded-lg px-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <CopyPlus className="h-4 w-4" />
                    All Post{" "}
                  </Link>
                  <Link
                    to="/dashboard/add-category"
                    className="flex items-center font-normal gap-2 rounded-lg px-2  text-muted-foreground transition-all hover:text-primary"
                  >
                    <ListPlus className="h-4 w-4" />
                    Add Category{" "}
                  </Link>
                  <Link
                    to="/dashboard/comments"
                    className="flex items-center font-normal gap-2 rounded-lg px-2  text-muted-foreground transition-all hover:text-primary"
                  >
                    <MessageCircleMore className="h-4 w-4" />
                    Comments{" "}
                  </Link>
                  <Link
                    to="/dashboard/all-user"
                    className="flex items-center font-normal gap-2 rounded-lg px-2  text-muted-foreground transition-all hover:text-primary"
                  >
                    <Users className="h-4 w-4" />
                    Users
                  </Link>
                  <Link
                    to="/dashboard/analytics"
                    className="flex items-center font-normal gap-2 rounded-lg px-2  text-muted-foreground transition-all hover:text-primary"
                  >
                    <LineChart className="h-4 w-4" />
                    Analytics
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <div className=" flex flex-1 items-end justify-end">
              <Button>Logout</Button>
            </div>
          </header>
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
