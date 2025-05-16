import Header from "../components/hostingPage/Header";
import Footer from "../components/Footer";
import Main from "../components/hostingPage/Main";
import { useUserStore } from "../js/store/userStore";
import { useEffect } from "react";

export default function HostingPage() {
  const { getVenues, user, setMessage, message, setIsLoading } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getVenues(user.name);
        setIsLoading(false);
      } catch (error) {
        setMessage(error.message || "Something went wrong");
        setIsLoading(false);
      }
    };
    fetchData();
  }, [getVenues]);

  if (message) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">{message}</h1>
        <p className="text-lg text-gray-700">Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div>
        <Main />
      </div>
      <Footer />
    </>
  );
}
