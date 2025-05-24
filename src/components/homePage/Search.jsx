import LocationInput from "../global/LocationInput";
import DatePicker from "../global/DatePicker";
import { format } from "date-fns";
import AddGuests from "../global/AddGuests";
import { FaSearch } from "react-icons/fa";
import {
  useSearchStore,
  useDateStore,
  useGuestStore,
  useVenueStore,
  useLocationStore,
} from "../../js/store/useStore";

import { useEffect, useRef } from "react";

export function SearchMenu() {
  const {
    toggleSearchBar,
    setShowCalendar,
    showCalendar,
    setShowSuggestions,
    showSuggestions,
    setShowGuests,
    showGuests,
  } = useSearchStore();
  return (
    <div className="relative pre-lg:flex hidden  items-center space-x-4 w-full max-w-[500px] mx-auto bg-gray-100 shadow p-3 rounded-full hover:shadow-lg cursor-pointer transition">
      {/* Location Button */}
      <button
        className="flex-1 p-2 rounded-md shadow-md hover:bg-gray-50 transition"
        onClick={() => {
          toggleSearchBar();
          setShowSuggestions(!showSuggestions);
        }}
      >
        Add Place
      </button>
      {/* Dates Button */}
      <button
        className="flex-1 p-2 rounded-md shadow-md hover:bg-gray-50 transition"
        onClick={() => {
          toggleSearchBar();
          setShowCalendar(!showCalendar);
        }}
      >
        Add Dates
      </button>
      {/* Guests Button */}
      <button
        className="flex-1 p-2 rounded-md  shadow-md hover:bg-gray-50 transition"
        onClick={() => {
          toggleSearchBar();
          setShowGuests(!showGuests);
        }}
      >
        Add Guests
      </button>
      {/* Search Button */}
      <button
        className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        onClick={toggleSearchBar}
      >
        <FaSearch />
      </button>
    </div>
  );
}

export function SearchBar() {
  const {
    showCalendar,
    setShowCalendar,
    setShowGuests,
    showGuests,
    setShowSuggestions,
    toggleSearchBar,
    searchQuery,
    setSearchQuery,
  } = useSearchStore();
  const { checkIn, checkOut } = useDateStore();
  const { total, pets, infants, adults, children } = useGuestStore();
  const { setVenues, originalVenues } = useVenueStore();
  const { location } = useLocationStore();

  const searchBarRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
        setShowGuests(false);
        setShowSuggestions(false);
        toggleSearchBar();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowCalendar, setShowGuests, setShowSuggestions]);

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    setShowCalendar(false);
    setShowGuests(false);

    if (!(location || checkIn || checkOut || total || pets)) {
      setVenues(originalVenues);
      toggleSearchBar();
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
    toggleSearchBar();
  };
  return (
    <div
      ref={searchBarRef}
      className="absolute w-[750px] left-1/2 rounded-full transform -translate-x-1/2 top-20"
    >
      <form
        onSubmit={(e) => handleSearch(e)}
        className="relative w-full flex gap-4 flex-wrap align-items-center justify-between"
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
          className="absolute right-5 top-1/2 transform -translate-y-1/2 p-3 text-white rounded-full"
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
