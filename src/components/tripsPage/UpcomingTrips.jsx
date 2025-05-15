import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTripsStore } from "../../js/store/useStore";
import { useUserStore } from "../../js/store/userStore";

export function TripCard({ trip }) {
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
  const { upcomingTrips, pastTrips, cancelledTrips } = useTripsStore();
  const { message } = useUserStore();

  const visiblePastTrips = showAllPast ? pastTrips : pastTrips.slice(0, 4);
  const visibleCancelledTrips = showAllCancelled
    ? cancelledTrips
    : cancelledTrips.slice(0, 4);

  if (message) return <h1>{message}</h1>;

  return (
    <div className="px-4 py-8 space-y-10">
      {/* Upcoming Trips */}
      <section>
        <h3 className="text-2xl font-bold mb-4">Upcoming Trips</h3>
        {upcomingTrips.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {upcomingTrips.map((trip) => (
              <li>
                <TripCard key={trip.id} trip={trip} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-gray-100 p-6 rounded text-center">
            <p className="mb-4">No planned trips yet.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {visiblePastTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
            {pastTrips.length > 4 && (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {visibleCancelledTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
            {cancelledTrips.length > 4 && (
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
