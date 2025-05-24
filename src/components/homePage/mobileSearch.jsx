import { FaSearch } from "react-icons/fa";
import { format } from "date-fns";
import LocationInput from "../global/LocationInput";
import DatePicker from "../global/DatePicker";
import AddGuests from "../global/AddGuests";
import { useSearchStore } from "../../js/store/useStore";
import { useDateStore } from "../../js/store/useStore";
import { useGuestStore } from "../../js/store/useStore";
import { useVenueStore } from "../../js/store/useStore";
import { useLocationStore } from "../../js/store/useStore";

export default function MobileSearchBar({ toggle }) {
  const {
    showCalendar,
    setShowCalendar,
    setShowGuests,
    showGuests,
    setShowSuggestions,
    setSearchQuery,
  } = useSearchStore();
  const { checkIn, checkOut } = useDateStore();
  const { total, pets, infants, adults, children } = useGuestStore();
  const { setVenues, originalVenues } = useVenueStore();
  const { location } = useLocationStore();

  const handleSearch = (e) => {
    e.preventDefault();
    setShowCalendar(false);
    setShowGuests(false);
    setShowSuggestions(false);

    if (!(location || checkIn || checkOut || total || pets)) {
      setVenues(originalVenues);
      toggle(false);
      return;
    }

    const query = {
      location: location?.toLowerCase() || "",
      checkIn: checkIn ? new Date(checkIn) : null,
      checkOut: checkOut ? new Date(checkOut) : null,
      guests: { infants, children, adults, total },
      pets,
    };

    setSearchQuery(query); // Still set it, for consistency or tracking

    const filteredVenues = originalVenues.filter((venue) => {
      const matchesLocation = query.location
        ? venue.location &&
          `${venue.location.city}, ${venue.location.country}`
            .toLowerCase()
            .includes(query.location)
        : true;

      const matchesDates =
        query.checkIn && query.checkOut
          ? !venue.bookings?.some((booking) => {
              const bookedFrom = new Date(booking.dateFrom);
              const bookedTo = new Date(booking.dateTo);
              return query.checkIn <= bookedTo && query.checkOut >= bookedFrom;
            })
          : true;

      const matchesGuests = query.guests?.total
        ? venue.maxGuests >= query.guests.total
        : true;

      const matchesPets = query.pets ? venue.meta?.pets : true;

      return matchesLocation && matchesDates && matchesGuests && matchesPets;
    });

    setVenues(filteredVenues);
    toggle(false);
  };
  return (
    <div className="absolute p-8 z-100 inset-0 bg-[#f7f7f7] w-full left-1/2 transform -translate-x-1/2">
      <form
        onSubmit={(e) => handleSearch(e)}
        className="relative w-full flex flex-col gap-4 flex-wrap align-items-center justify-between"
      >
        <LocationInput />
        <div
          role="button"
          id="button"
          className="flex-1 flex justify-center items-center bg-white shadow-md hover:bg-gray-50 transition p-4"
          onClick={() => {
            setShowCalendar(!showCalendar);
            setShowGuests(false);
            setShowSuggestions(false);
          }}
        >
          <span>{checkIn ? format(checkIn, "dd MMM") : "Check In"}</span>
        </div>
        <div
          id="button"
          role="button"
          className="flex-1 flex justify-center items-center bg-white shadow-md hover:bg-gray-50 transition p-4"
          onClick={() => {
            setShowCalendar(!showCalendar);
            setShowGuests(false);
            setShowSuggestions(false);
          }}
        >
          <span>{checkOut ? format(checkOut, "dd MMM") : "Check Out"}</span>
        </div>
        <div
          id="button"
          role="button"
          className="relative flex-2 flex p-4 shadow-md hover:bg-gray-50 transition "
          onClick={() => {
            setShowGuests(!showGuests);
            setShowCalendar(false);
            setShowSuggestions(false);
          }}
        >
          <div className="relative flex-1 flex justify-center items-center">
            <span> {total ? `${total} guests, ${pets} pets` : "Guests"}</span>
            <div className="absolute top-12 w-[110%] rounded-2xl">
              {showGuests && <AddGuests />}
            </div>
          </div>
        </div>
        <button
          id="search-button"
          className="flex justify-center items-center p-3 text-white rounded-full"
          type="submit"
        >
          <FaSearch />
        </button>
        <div className="absolute w-full top-16 left-1/2 transform -translate-x-1/2">
          {showCalendar && <DatePicker />}
        </div>
      </form>
    </div>
  );
}
