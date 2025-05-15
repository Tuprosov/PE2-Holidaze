import { use, useState } from "react";
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
            {displayReservations()}
          </>
        );
      case "cancelled":
        return (
          <>
            <p className="text-center">
              You have {reservations.cancelled.length} cancelled reservations.
            </p>
            {displayReservations()}
          </>
        );
      case "all":
        return (
          <>
            <p className="text-center">
              You have {reservations.all.length} total reservations.
            </p>
            {displayReservations()}
          </>
        );
      default: // "upcoming"
        return (
          <>
            <p className="text-center">
              You have {reservations.upcoming.length} upcoming reservations.
            </p>
            {displayReservations()}
          </>
        );
    }
  };

  return (
    <div className="mb-8">
      {/* tabs */}
      <div className="flex space-x-4 mb-4">
        {["upcoming", "past", "cancelled", "all"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-medium ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* tab Content */}
      <div className="p-4 bg-gray-100 rounded h-48">{renderContent()}</div>
    </div>
  );
}

function ReservationCard({ venue }) {
  const booking = venue.bookings;
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
            {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
          </strong>
        </p>
      </div>
    </div>
  );
}

function displayReservations() {
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
    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {reservations[activeTab].map((res) => {
        const venue = venueMap[res.venueId];

        return (
          <li key={res.id} className="mb-4 p-4 border rounded">
            <ReservationCard venue={venue} />
          </li>
        );
      })}
    </ul>
  );
}
