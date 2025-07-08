import MainContent from "../components/homePage/MainContent";
import { useEffect } from "react";
import { useVenueStore, useErrorStore } from "../js/store/useStore";

export default function HomePage() {
  const { loading, fetchVenues } = useVenueStore();
  const { error, setError, clearError } = useErrorStore();

  useEffect(() => {
    clearError();
    fetchVenues().catch(setError);
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
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <>
      <MainContent />
    </>
  );
}
