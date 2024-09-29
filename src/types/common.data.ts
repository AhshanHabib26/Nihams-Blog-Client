export type TBlog = {
  _id: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
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

export type TCategory = {
  _id: string;
  title: string;
};
