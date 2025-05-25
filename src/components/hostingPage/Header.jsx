import Menu from "./Menu";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import { useUserStore } from "../../js/store/userStore";
import logo from "../..//assets/holidaze-logo.png";

export default function Header() {
  const { isLoggedIn } = useUserStore();
  return (
    <>
      <header className="relative mb-10">
        <div className="flex justify-between items-center h-20 px-4">
          <div className="flex-[1]">
            <Link>
              <div className="max-w-[80px]">
                <img className="w-full h-auto" src={logo} alt="logo" />
              </div>
            </Link>
          </div>
          <div className="hidden md:block flex-[2]">
            {isLoggedIn && <Nav />}
          </div>
          <div className="flex-[1] flex justify-end">
            <Menu />
          </div>
        </div>
        <div id="hostingNav" className="block md:hidden top-30 left-0">
          {isLoggedIn && <Nav />}
        </div>
      </header>
    </>
  );
}
