import { useInView } from "react-intersection-observer";
import VenueCard from "./VenueCard";
import { useVenueStore } from "../../js/store/useStore";

function LazyVenueCard({ venue }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Load only once when visible
    threshold: 0.1, // Trigger when 10% visible
  });

  return (
    <div ref={ref} style={{ minHeight: "400px" }}>
      {inView ? <VenueCard venue={venue} /> : null}
    </div>
  );
}

export default function MainContent() {
  const { venues } = useVenueStore();

  return venues.length ? (
    <main className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 min-h-[100dvh]">
      {venues.map((venue) => (
        <LazyVenueCard key={venue.id} venue={venue} />
      ))}
    </main>
  ) : (
    <div className="flex justify-center items-center min-h-[100dvh]">
      <h2>Nothing found</h2>
    </div>
  );
}
