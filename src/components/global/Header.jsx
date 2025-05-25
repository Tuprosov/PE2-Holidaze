import { AnimatePresence, motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchStore } from "../../js/store/useStore";
import { SearchMenu, SearchBar } from "../homePage/Search";
import { Menu } from "../homePage/Menu";
import logo from "../../assets/holidaze-logo.png";
import MobileSearchBar from "../homePage/mobileSearch";

export default function Header() {
  const { showSearchBar } = useSearchStore();
  const [showMobileSearch, setshowMobileSearch] = useState(false);
  // determine page
  const isHomePage = useLocation().pathname === "/";

  return (
    <>
      <header className="bg-white h-20 relative z-10 mb-20">
        <div className="relative flex w-full px-4 items-center justify-between gap-4 h-full">
          {/* Logo */}
          <Link className="md:flex-[1]" to="/">
            <div className=" max-w-[80px]">
              <img className="w-full h-auto" src={logo} alt="logo" />
            </div>
          </Link>

          {/* SearchBar */}
          {isHomePage ? (
            !showSearchBar ? (
              <div className="flex-[2]">
                <SearchMenu />
              </div>
            ) : (
              <motion.h2
                id="choosestay"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="block xs:hidden"
              >
                Choose your stay
              </motion.h2>
            )
          ) : null}

          {/* Menu */}
          <div className="flex md:flex-[1] justify-end gap-4 items-center">
            {/* swtich to hosting */}
            <Link
              id="button"
              to={"/hosting"}
              className="p-3 hidden xl:block"
              type="button"
            >
              Switch to Hosting
            </Link>

            {/* Burger Menu */}
            <Menu />
          </div>
        </div>
      </header>

      {/* Expanding Search content */}
      <AnimatePresence>
        {showSearchBar && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-10 left-0 w-full bg-white z-20"
          >
            <SearchBar />
          </motion.div>
        )}
      </AnimatePresence>
      {isHomePage && (
        <button
          onClick={() => setshowMobileSearch(true)}
          className="w-full flex pre-lg:hidden bg-white shadow-md p-4 rounded-full  items-center justify-center gap-2"
        >
          <FaSearch />
          <span>Search</span>
        </button>
      )}
      {isHomePage && showMobileSearch && (
        <MobileSearchBar toggle={setshowMobileSearch} />
      )}
    </>
  );
}
