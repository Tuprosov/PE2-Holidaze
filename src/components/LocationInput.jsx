// LocationInput component
import { useState, useEffect, useRef } from "react";
import { useSearchStore, useVenueStore } from "../js/store/useStore";

export default function LocationInput() {
  const [location, setLocation] = useState("");
  const { locationSuggestions } = useVenueStore();
  const {
    setShowSuggestions,
    showSuggestions,
    setShowCalendar,
    setShowGuests,
  } = useSearchStore();

  const handleSelect = (suggestion) => {
    setLocation(suggestion);
    setShowSuggestions(false); // hide suggestions after selecting
  };

  return (
    <div className="relative w-full p-4 flex-2 bg-white border-[1px] [border-color:#d6e4e7] shadow-lg rounded-full">
      {" "}
      {/* Input for Location */}
      <label htmlFor="location" className="sr-only">
        Location
      </label>
      <input
        id="location"
        type="text"
        className="w-full rounded-md focus:outline-none"
        placeholder="Enter a location"
        value={location}
        onClick={() => {
          setShowSuggestions(true);
          setShowCalendar(false);
          setShowGuests(false);
        }}
        onChange={(e) => setLocation(e.target.value)}
      />
      {/* Simulated Suggestions */}
      {showSuggestions && (
        <ul className="absolute top-16 max-h-60 overflow-y-auto min-w-[200px] rounded-2xl shadow-md bg-white border [border-color:#d6e4e7] ">
          {locationSuggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="py-2 px-3 cursor-pointer hover:bg-gray-200 rounded-md"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// .filter((item) =>
//   item.toLowerCase().includes(location.toLowerCase())
// )
