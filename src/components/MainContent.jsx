import { useEffect } from "react";
import VenueCard from "./VenueCard";
import { useVenueStore } from "../js/store/useStore";

export default function MainContent() {
  const { venues, loading, error, fetchVenues } = useVenueStore();

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
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </main>
  );
}
