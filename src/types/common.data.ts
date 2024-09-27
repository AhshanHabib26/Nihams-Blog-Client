
export type TBlog = {
  _id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  viewsCount: number;
  likesCount: number;
  createdAt?: string;
  comments: number;
};
export type TBlogProps = {
  blog: TBlog;
  index?: number;
};
