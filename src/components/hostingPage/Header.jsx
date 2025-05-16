import Menu from "./Menu";
import Nav from "./Nav";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header>
        <div className="flex justify-between items-centerh-20 mb-10">
          <div className="logo">
            <Link className="flex-[1]">
              <div>Logo</div>
            </Link>
          </div>
          <div className="nav">
            <Nav />
          </div>
          <div className="relative">
            <Menu />
          </div>
        </div>
      </header>
    </>
  );
}
