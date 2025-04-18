import { AnimatePresence, motion } from "framer-motion";
import { useSearchStore } from "../js/store/useStore";
import { SearchMenu, SearchBar } from "./Search";

export default function Header() {
  const { showSearchBar, showSuggestions, showCalendar, showGuests } =
    useSearchStore();

  return (
    <>
      {/* Fixed height header */}
      <header className="bg-white h-20 relative z-10">
        <div className="relative flex w-full px-4 items-center justify-between gap-4 h-full">
          {/* Logo */}
          <div className="min-w-[100px]">Logo</div>

          {/* SearchBar */}
          {!showSearchBar ? (
            <SearchMenu />
          ) : (
            <motion.h2
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              Choose your stay
            </motion.h2>
          )}

          {/* Burger Menu */}
          <div className="min-w-[100px]">Burger Menu</div>
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
    </>
  );
}
