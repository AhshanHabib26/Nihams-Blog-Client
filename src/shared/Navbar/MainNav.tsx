import { Button } from "@/components/ui/button";
import Container from "@/lib/Container";
import { Link } from "react-router-dom";

const MainNav = () => {
  return (
    <div>
      <hr className=" border-dashed border-slate-700" />
      <Container>
        <div className="flex items-center justify-between py-2">
          <div>
            <Link to="/">
              <h1 className="text-3xl hind-siliguri-semibold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                Nihamsedu
              </h1>
            </Link>
          </div>
          <div>
            <Link to="/login">
              <Button className=" bg-myBgPrimary hover:bg-myBgSecondary text-lg hind-siliguri-light px-2 h-[45px]">
                Create an Account
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MainNav;
