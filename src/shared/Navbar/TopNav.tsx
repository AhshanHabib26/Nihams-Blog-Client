import { Button } from "@/components/ui/button";
import Container from "@/lib/Container";
import { formattedBanglaDate } from "@/lib/ConvertDateInBangla";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaRegClock,
  FaYoutube,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <div className="transparent-bg">
      <Container>
        <div className="flex items-center justify-between py-3">
          <div>
            <Link to="/">
              <h1 className="text-3xl hind-siliguri-semibold  bg bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                Nihamsedu
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-5">
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
            <div>
              <div>
                <Link to="/login">
                  <Button className=" bg-myBgPrimary hover:bg-myBgSecondary text-lg hind-siliguri-light px-2 h-[45px]">
                    Create an Account
                  </Button>
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
