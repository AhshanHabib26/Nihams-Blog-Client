import { TBlogProps } from "@/types/common.data";
import userImg from "../../../../assets/icons/profile.png";
import moment from "moment";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share"; 
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaEye, FaThumbsUp } from "react-icons/fa6";

const BlogCard: React.FC<TBlogProps> = ({ blog }) => {
  const shareUrl = window.location.href; 

  return (
    <div className="text-gray-600 border border-gray-200 mb-4 p-3 rounded-lg">
      <div className="flex items-center gap-1">
        <img className="w-[40px]" src={userImg} alt="Admin" />
        <div>
          <h1 className="text-[16px] hind-siliguri-medium">{blog.author}</h1>
          <p className="text-sm hind-siliguri-medium">
            {moment(blog.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        </div>
      </div>
      <div className="my-2">
        <h1 className="text-lg hind-siliguri-semibold">{blog.title}</h1>
        <p>{`${blog.description.slice(0, 220)}.....`}</p>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <FaThumbsUp size={18} className=" cursor-pointer" />
            <span className="ml-1">{blog.likesCount}</span>
          </div>
          <div className="flex items-center">
            <FaEye size={18} className=" cursor-pointer" />
            <span className="ml-1">{blog.viewsCount}</span>
          </div>
          <div className="flex items-center">
            <IoChatbubbleEllipsesSharp className=" cursor-pointer" size={18} />
            <span className="ml-1">{blog.comments}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={28} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={28} round />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={28} round />
          </LinkedinShareButton>
          <PinterestShareButton url={shareUrl} media={userImg}>
            <PinterestIcon size={28} round />
          </PinterestShareButton>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={28} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
