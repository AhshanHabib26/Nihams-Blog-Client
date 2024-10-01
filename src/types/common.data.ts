export type TBlog = {
  _id: string;
  title: string;
  description: string;
  author: string;
  tags: string[];
  likes: string[];
  user?: {
    fullname: string;
  };
  category: TCategory;
  slug: string;
  viewsCount: number;
  likesCount: number;
  createdAt?: string;
  comments?: TComment[];
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

export type TComment = {
  _id: string;
  description: string;
  user: {
    initials: string; 
    fullname: string; 
  };
  createdAt: string; 
};
