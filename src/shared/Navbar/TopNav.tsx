import Container from "@/lib/Container";
import { formattedBanglaDate } from "@/lib/ConvertDateInBangla";
import {
  FaArrowTrendUp,
  FaFacebookF,
  FaLinkedinIn,
  FaRegClock,
  FaYoutube,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <div>
      <Container>
        <div className="flex items-center justify-between py-3">
          <div className=" flex items-center">
            <FaArrowTrendUp color="#fff" size={18} />
            <p className=" hind-siliguri-light text-lg lg:text-xl ml-2 text-white">
              React Virtual DOM Explanation
            </p>
          </div>
          <div className=" hidden lg:block">
            <div className=" flex items-center gap-3">
              <div className=" flex items-center">
                <FaRegClock color="#fff" size={18} />
                <p className="hind-siliguri-light text-xl ml-1 text-white">
                  {formattedBanglaDate}
                </p>
              </div>
              <hr className=" border-[#fff] border h-[16px]" />
              <div className=" flex items-center">
                <Link to="/">
                  <FaFacebookF
                    className="text-white hover:text-seconderyColor transition-colors duration-300"
                    size={18}
                  />
                </Link>
                <Link to="/">
                  {" "}
                  <FaLinkedinIn
                    className="text-white hover:text-seconderyColor transition-colors duration-300 mx-2"
                    size={18}
                  />
                </Link>
                <Link to="/">
                  {" "}
                  <FaYoutube
                    className="text-white hover:text-seconderyColor transition-colors duration-300"
                    size={18}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TopNav;
