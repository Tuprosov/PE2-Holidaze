import { useState } from "react";
import { useUserStore } from "../../js/store/userStore";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { reservations } = useUserStore();

  const renderContent = () => {
    switch (activeTab) {
      case "past":
        return (
          <>
            <p className="text-center">
              You have {reservations.past.length} past reservations.
            </p>
            {displayReservations(activeTab)}
          </>
        );
      case "cancelled":
        return (
          <>
            <p className="text-center">
              You have {reservations.cancelled.length} cancelled reservations.
            </p>
            {displayReservations(activeTab)}
          </>
        );
      case "all":
        return (
          <>
            <p className="text-center">
              You have {reservations.all.length} total reservations.
            </p>
            {displayReservations(activeTab)}
          </>
        );
      default: // "upcoming"
        return (
          <>
            <p className="text-center">
              You have {reservations.upcoming.length} upcoming reservations.
            </p>
            {displayReservations(activeTab)}
          </>
        );
    }
  };

  return (
    <div className="mb-8">
      {/* tabs */}
      <div className="flex flex-wrap gap-1 mb-4">
        {["upcoming", "past", "cancelled", "all"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2"
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* tab Content */}
      <div className="p-4 border-t border-b [border-color:#d6e4e7] rounded">
        {renderContent()}
      </div>
    </div>
  );
}

function ReservationCard({ venue, booking }) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="flex items-center p-4 rounded shadow bg-white">
      <img
        src={venue.media[0].url}
        alt={venue.media[0].alt}
        className="w-24 h-24 object-cover rounded mr-4"
      />
      <div>
        <p>
          <strong>Venue:</strong> {venue.name}
        </p>
        <p>
          <strong className="font-semibold text-lg block">
            {venue.location.city}, {venue.location.country}
          </strong>
        </p>
        <p className="text-gray-500">
          <strong>
            {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)} |
            Guests: {booking.guests}
          </strong>
        </p>
      </div>
    </div>
  );
}

function displayReservations(activeTab) {
  const { userVenues, reservations, isLoading } = useUserStore();
  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  //   create a hashmap of venues
  const venueMap = userVenues.reduce((acc, venue) => {
    acc[venue.id] = venue;
    return acc;
  }, {});

  return (
    <ul className="flex flex-wrap items bg-center gap-4">
      {reservations[activeTab].map((res) => {
        const venue = venueMap[res.venueId];
        return (
          <li key={res.id} className="border  [border-color:#d6e4e7] rounded">
            <ReservationCard venue={venue} booking={res} />
          </li>
        );
      })}
    </ul>
  );
}
