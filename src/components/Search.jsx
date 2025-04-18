// SearchBar component
import LocationInput from "./LocationInput";
import DatePicker from "./DatePicker";
import { format } from "date-fns";
import AddGuests from "./AddGuests";
import { FaSearch } from "react-icons/fa";
import {
  useSearchStore,
  useDateStore,
  useGuestStore,
} from "../js/store/useStore";

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
    <div className="relative flex space-x-4 items-center justify-center w-full max-w-[500px] mx-auto bg-gray-100 shadow p-3 rounded-full hover:shadow-lg cursor-pointer transition">
      {/* Location Button */}
      <button
        className="flex-1 p-2 rounded-md bg-white shadow-md hover:bg-gray-50 transition"
        onClick={() => {
          toggleSearchBar();
          setShowSuggestions(!showSuggestions);
        }}
      >
        Add Place
      </button>
      {/* Dates Button */}
      <button
        className="flex-1 p-2 rounded-md bg-white shadow-md hover:bg-gray-50 transition"
        onClick={() => {
          toggleSearchBar();
          setShowCalendar(!showCalendar);
        }}
      >
        Add Dates
      </button>
      {/* Guests Button */}
      <button
        className="flex-1 p-2 rounded-md bg-white shadow-md hover:bg-gray-50 transition"
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
  } = useSearchStore();
  const { checkIn, checkOut } = useDateStore();
  const { total, pets } = useGuestStore();

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

  return (
    <div
      ref={searchBarRef}
      className="absolute left-1/2 rounded-full transform -translate-x-1/2 top-20 w-full max-w-[850px] sm:max-w-[700px]"
    >
      <form className="relative w-full flex gap-4 flex-wrap align-items-center justify-between">
        <LocationInput />
        <div
          role="button"
          id="button"
          className="flex-1 flex justify-center items-center bg-white shadow-md hover:bg-gray-50 transition"
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
          className="flex-1 flex justify-center items-center bg-white shadow-md hover:bg-gray-50 transition"
          onClick={() => {
            setShowCalendar(!showCalendar);
            setShowGuests(false);
            setShowSuggestions(false);
          }}
        >
          <span>{checkOut ? format(checkOut, "dd MMM") : "Check In"}</span>
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
            {showGuests && <AddGuests />}
          </div>
        </div>
        <button
          id="search-button"
          className="absolute right-5 top-1/2 transform -translate-y-1/2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          type="submit"
        >
          <FaSearch />
        </button>
        {showCalendar && <DatePicker />}
      </form>
    </div>
  );
}
