import { useState } from "react";
import { FaHome, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { useUserStore } from "../../js/store/userStore";
import CreateListing from "./CreateListing";

function ListingCard({ venue, reservations }) {
  const [showBookings, setShowBookings] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const cleanedVenue = {
    description: venue.description || "",
    name: venue.name || "",
    location: venue.location || {
      country: "",
      city: "",
      address: "",
      zip: "",
      continent: "",
    },
    maxGuests: venue.maxGuests || "",
    media: venue.media || [],
    meta: venue.meta || {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
    price: venue.price || "",
  };

  // Filter reservations for this venue
  const venueReservations = reservations.filter(
    (res) => res.venueId === venue.id
  );

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="border [border-color:#d6e4e7] rounded p-4 mb-6 shadow-md max-w-xl w-full cursor-pointer"
      >
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
          onClick={(e) => {
            e.stopPropagation();
            setShowBookings((prev) => !prev);
          }}
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
                    {formatDate(booking.dateFrom)} -{" "}
                    {formatDate(booking.dateTo)}
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
      {/* Modal */}
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-10 rounded-xl shadow-lg max-w-sm w-full text-center space-y-6"
          >
            {isEditing ? (
              <CreateListing
                onClose={() => {
                  setIsEditing(false);
                  setShowModal(false);
                }}
                venue={cleanedVenue}
                id={venue.id}
                isCreating={false}
              />
            ) : confirmModal ? (
              <ConfirmDeleteModal
                setConfirmModal={setConfirmModal}
                setShowModal={setShowModal}
                id={venue.id}
              />
            ) : (
              <>
                <h2 className="text-xl font-bold">Manage Listing</h2>
                <div className="flex justify-center items-center">
                  {venue.media?.[0]?.url && (
                    <img
                      src={venue.media[0].url}
                      alt={venue.media[0].alt || "Reservation image"}
                      className="w-[50%] h-40 object-cover rounded mb-4"
                    />
                  )}
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex justify-center items-center gap-2 w-full py-2 rounded"
                >
                  <FaEdit />
                  Edit Listing
                </button>
                <button
                  onClick={() => setConfirmModal(true)}
                  className="flex justify-center items-center gap-2 w-full py-2 text-red-600 hover:text-red-700 transition rounded"
                >
                  <FaTrash />
                  Delete Listing
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 underline p-2"
                >
                  Cancel
                </button>
              </>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}

function ConfirmDeleteModal({ setConfirmModal, setShowModal, id }) {
  const { deleteListing, setMessage } = useUserStore();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await deleteListing(id);
      console.log("Confirmed delete");
      setConfirmModal(false);
      setShowModal(false);
    } catch (error) {
      setMessage(error.message) || "Error deleting the listing";
    }
  };

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Delete Listing</h2>
      <p className="text-gray-700 mb-6">
        Are you sure you want to delete this listing? This action cannot be
        undone.
      </p>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setConfirmModal(false)}
          className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default function Main() {
  const { userVenues, reservations, isLoading, message } = useUserStore();
  const [showCreateModal, setShowCreateModal] = useState(false);

  // No venues case
  if (!userVenues.length) {
    return (
      <div className="flex flex-col justify-center items-center h-56 gap-[16px] mb-8">
        <FaHome className="text-6xl text-gray-400" />
        <p className="text-lg font-semibold">You have no venues listed.</p>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 0 rounded"
        >
          Create Listing
        </button>
        {showCreateModal && <CreateListing onClose={setShowCreateModal} />}
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
    <main className="relative p-6 max-w-8xl">
      <div className="flex justify-between mb-20">
        <h1 className="text-3xl font-bold">Your Listings</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-2 0 rounded"
        >
          Create Listing
        </button>
      </div>
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
      {showCreateModal && <CreateListing onClose={setShowCreateModal} />}
    </main>
  );
}
