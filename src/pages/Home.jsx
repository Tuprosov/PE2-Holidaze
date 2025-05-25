import MainContent from "../components/homePage/MainContent";
import { useEffect } from "react";
import { useVenueStore } from "../js/store/useStore";

export default function HomePage() {
  const { error, loading, fetchVenues } = useVenueStore();

  useEffect(() => {
    fetchVenues();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Error displaying venues. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <MainContent />
    </>
  );
}
