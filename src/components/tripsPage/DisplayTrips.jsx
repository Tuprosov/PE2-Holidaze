import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../js/store/userStore";

function TripCard({ trip }) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="flex items-center p-4 rounded shadow bg-white">
      <img
        src={trip.venue.media[0].url}
        alt={trip.venue.media[0].alt}
        className="w-24 h-24 object-cover rounded mr-4"
      />
      <div>
        <strong className="font-semibold text-lg block">
          {trip.venue.location.city}
        </strong>
        <p className="text-gray-500">
          {formatDate(trip.dateFrom)} - {formatDate(trip.dateTo)}
        </p>
      </div>
    </div>
  );
}

export default function UpcomingTrips() {
  const [showAllPast, setShowAllPast] = useState(false);
  const [showAllCancelled, setShowAllCancelled] = useState(false);
  const navigate = useNavigate();
  const { message, setMessage, trips } = useUserStore();
  const { upcoming, past, cancelled } = trips;

  const visiblePastTrips = showAllPast ? past : past.slice(0, 4);
  const visibleCancelledTrips = showAllCancelled
    ? cancelled
    : cancelled.slice(0, 4);

  useEffect(() => {
    setMessage("");
  }, [setMessage]);

  if (message) return <h1>{message}</h1>;

  return (
    <div className="px-4 py-8 space-y-10">
      {/* Upcoming Trips */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Upcoming Trips</h3>
        {upcoming.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {upcoming.map((trip) => (
              <li key={trip.id}>
                <TripCard trip={trip} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-gray-100 p-6 rounded text-center">
            <p className="mb-4">No planned trips yet.</p>
            <button
              onClick={() => navigate("/")}
              className="text-white px-4 py-2 rounded"
            >
              Explore Stays
            </button>
          </div>
        )}
      </section>

      {/* Past Trips */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Past Trips</h3>
        {visiblePastTrips.length > 0 ? (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {visiblePastTrips.map((trip) => (
                <li key={trip.id}>
                  <TripCard trip={trip} />
                </li>
              ))}
            </ul>
            {past.length > 4 && (
              <button
                onClick={() => setShowAllPast((prev) => !prev)}
                className="mt-4 underline text-sm"
              >
                {showAllPast ? "Show less" : "Show more"}
              </button>
            )}
          </>
        ) : (
          <p>No past trips found.</p>
        )}
      </section>

      {/* Cancelled Trips */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Cancelled Trips</h3>
        {visibleCancelledTrips.length > 0 ? (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {visibleCancelledTrips.map((trip) => (
                <li key={trip.id}>
                  <TripCard trip={trip} />
                </li>
              ))}
            </ul>
            {cancelled.length > 4 && (
              <button
                onClick={() => setShowAllCancelled((prev) => !prev)}
                className="mt-4 underline text-sm"
              >
                {showAllCancelled ? "Show less" : "Show more"}
              </button>
            )}
          </>
        ) : (
          <p>No cancelled trips found.</p>
        )}
      </section>
    </div>
  );
}
