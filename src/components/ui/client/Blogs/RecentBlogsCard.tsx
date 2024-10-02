import { TBlogProps } from "@/types/common.data";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";


interface Props extends TBlogProps {
    isLast?: boolean;
  }

const RecentBlogsCard: React.FC<Props> = ({ post, isLast }) => {
  return (
    <div
      className={`text-gray-700 ${
        isLast ? "" : "border-b border-gray-200 border-dashed"
      }`}
    >
      <Link to={`/blog/${post.slug}`}>
        <div className="flex items-center justify-between">
          <h1 className="my-1 text-[17px] hind-siliguri-light hover:text-myBgPrimary">{post.title}</h1>
          <FaAngleRight className="text-gray-500" size={15} />
        </div>
      </Link>
    </div>
  )
}

export default RecentBlogsCard