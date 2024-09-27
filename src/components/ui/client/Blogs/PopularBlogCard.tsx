import { TBlogProps } from "@/types/common.data";

interface Props extends TBlogProps {
  isLast?: boolean;
}

const PopularBlogCard: React.FC<Props> = ({ blog, index, isLast }) => {
  return (
    <div className={`text-gray-600 ${isLast ? '' : 'border-b border-gray-200 border-dashed'}`}>
      <div className="mb-2">
        <span>{(index ?? 0) + 1}</span>
        <p>{blog.category}</p>
        <h1>{blog.title}</h1>
      </div>
    </div>
  );
};

export default PopularBlogCard;
