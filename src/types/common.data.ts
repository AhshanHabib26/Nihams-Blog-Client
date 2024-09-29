export type TBlog = {
  _id: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  user?: {
    fullname: string;
  };
  category: TCategory
  slug: string;
  viewsCount: number;
  likesCount: number;
  createdAt?: string;
  comments: number;
};
export type TBlogProps = {
  post: TBlog;
  index?: number;
  deleteHandler?: (id: string) => void;
};

export type TCategory = {
  _id: string;
  title: string;
};
