import { useState } from "react";
import { FaHome } from "react-icons/fa"; // home icon
import { useUserStore } from "../../js/store/userStore";
import CreateListing from "./CreateListing";
import { section } from "framer-motion/client";

function ListingCard({ venue, reservations }) {
  const [showBookings, setShowBookings] = useState(false);
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Filter reservations for this venue
  const venueReservations = reservations.filter(
    (res) => res.venueId === venue.id
  );

  return (
    <div className="border [border-color:#d6e4e7] rounded p-4 mb-6 shadow-md max-w-xl w-full">
      <img
        src={venue.media[0].url}
        alt={venue.media[0].alt || venue.name}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{venue.name}</h3>
      <p className="mb-2">
        {venue.location.country}, {venue.location.city}
      </p>
      {/* Add media, description, etc. here */}

      <button
        onClick={() => setShowBookings((prev) => !prev)}
        className="underline p-2 mb-2"
      >
        Upcoming Reservations ({venueReservations.length})
      </button>

      {showBookings && (
        <ul className="pl-4 border-l ml-2">
          {venueReservations.length > 0 ? (
            venueReservations.map((booking) => (
              <li key={booking.id} className="mb-1">
                <strong>
                  {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                </strong>{" "}
                | Guests: {booking.guests}
              </li>
            ))
          ) : (
            <li>No upcoming reservations.</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default function Main() {
  const { userVenues, reservations, user, isLoading, message } = useUserStore();
  const [creating, setCreating] = useState(false);

  // No venues case
  if (userVenues.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-56 gap-[16px] mb-8">
        <FaHome className="text-6xl text-gray-400" />
        <p className="text-lg font-semibold">You have no venues listed.</p>
        <button
          onClick={() => setCreating(true)}
          className="px-4 py-2 0 rounded"
        >
          Create Listing
        </button>
        <CreateListing onClose={setCreating} creating={creating} user={user} />
      </div>
    );
  }

  if (message) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">{message}</h1>
        <p className="text-lg text-gray-700">Please try again later.</p>
      </div>
    );
  }

  // Venues exist - show list
  return (
    <main className="relative p-6 max-w-8xl mx-auto h-dvh">
      <h1 className="text-3xl font-bold mb-20">Your Listings</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {userVenues.map((venue) => (
            <ListingCard
              key={venue.id}
              venue={venue}
              reservations={reservations.upcoming}
            />
          ))}
        </section>
      )}
      <button
        onClick={() => setCreating(true)}
        className="absolute right-10 top-10 px-6 py-2 0 rounded"
      >
        Create Listing
      </button>
      <CreateListing onClose={setCreating} creating={creating} user={user} />
    </main>
  );
}
