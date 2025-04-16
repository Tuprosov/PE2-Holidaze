// SearchBar component
import { useState } from "react";
import LocationInput from "./LocationInput";
import DatePicker from "./DatePicker";
import AddGuests from "./AddGuests";
import { FaSearch } from "react-icons/fa";
import useSearchStore from "../js/store/useSearchStore";

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
  const { showCalendar, setShowCalendar, setShowGuests, showGuests } =
    useSearchStore();
  return (
    <div className="absolute left-1/2 rounded-full transform -translate-x-1/2 top-20 w-full max-w-[850px] sm:max-w-[700px]">
      <form className="relative w-full flex gap-4 flex-wrap align-items-center justify-between">
        <LocationInput />
        <div
          role="button"
          id="button"
          className="flex-1 flex justify-center items-center bg-white shadow-md hover:bg-gray-50 transition"
          onClick={() => {
            setShowCalendar(!showCalendar);
          }}
        >
          <span>Check In</span>
        </div>
        <div
          id="button"
          role="button"
          className="flex-1 flex justify-center items-center bg-white shadow-md hover:bg-gray-50 transition"
          onClick={() => {
            setShowCalendar(!showCalendar);
          }}
        >
          <span>Check Out</span>
        </div>
        <div
          id="button"
          role="button"
          className="relative flex-2 flex p-4 shadow-md hover:bg-gray-50 transition "
          onClick={() => {
            setShowGuests(!showGuests);
          }}
        >
          <div className="relative flex-1 flex justify-center items-center">
            <span> Guests</span>
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
