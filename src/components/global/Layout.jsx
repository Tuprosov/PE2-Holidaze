import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { getTitle } from "../../js/utils/generateTitles.js";
import { useEffect } from "react";
import { useUserStore } from "../../js/store/userStore.js";
import { useVenueStore } from "../../js/store/useStore.js";

export default function Layout() {
  const { user, isLoggedIn } = useUserStore();
  const { singleVenue } = useVenueStore();
  const location = useLocation();
  const isVenuePage = location.pathname.startsWith("/venue/");

  useEffect(() => {
    if (!isLoggedIn) return;
    document.title = getTitle(location.pathname, { user, singleVenue });
  }, [location.pathname, singleVenue]);

  return (
    <div className={isVenuePage ? "max-w-[1280px] mx-auto" : ""}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
