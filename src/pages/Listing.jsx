import Header from "../components/hostingPage/Header";
import Footer from "../components/Footer";
import Main from "../components/listingPage/Main";
import { useUserStore } from "../js/store/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ListingPage() {
  const { message, setMessage, user, userVenues, getVenues, isLoggedIn } =
    useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userVenues.length || !user) return;
    const fetchData = async () => {
      try {
        await getVenues(user.name);
      } catch (error) {
        setMessage(error.message || "Something went wrong");
      }
    };
    fetchData();
  }, [user, userVenues]);

  return isLoggedIn ? (
    <>
      <Header />
      {message ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">{message}</h1>
          <p className="text-lg text-gray-700">Please try again later.</p>
        </div>
      ) : (
        <Main />
      )}
      <Footer />
    </>
  ) : (
    <div className="flex h-dvh justify-center items-center">
      <h1>You’re not authorized. Please login or sign up</h1>
      <button className="p-2" onClick={() => navigate("/auth")} type="button">
        Login/Sign up
      </button>
    </div>
  );
}
