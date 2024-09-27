import MainNav from "./MainNav";
import TopNav from "./TopNav";
import Styles from "../../style/Navbar.module.css"



const Navbar = () => {
  return (
    <div className={`${Styles.BGNav}`}>
      <TopNav />
      <MainNav />
    </div>
  );
};

export default Navbar;
