// LocationInput component
import { useEffect } from "react";
import {
  useSearchStore,
  useVenueStore,
  useLocationStore,
} from "../../js/store/useStore";

export default function LocationInput() {
  const { location, setLocation, locationSuggestions, setLocationSuggestions } =
    useLocationStore();
  const { originalVenues } = useVenueStore();
  const {
    setShowSuggestions,
    showSuggestions,
    setShowCalendar,
    setShowGuests,
  } = useSearchStore();

  useEffect(() => {
    if (originalVenues.length > 0) {
      const suggestions = Array.from(
        new Set(
          originalVenues
            .filter(
              (venue) =>
                venue.location && venue.location.city && venue.location.country
            )
            .map((venue) => `${venue.location.city}, ${venue.location.country}`)
        )
      );
      setLocationSuggestions(suggestions);
    }
  }, [setLocationSuggestions]);

  const handleInputchange = (e) => {
    const value = e.target.value;
    setLocation(value);
  };

  const handleSelect = (suggestion) => {
    setLocation(suggestion);
    setShowSuggestions(false);
    setShowCalendar(true);
  };

  const filteredSuggestions = locationSuggestions.filter((item) =>
    item.toLowerCase().includes(location.toLowerCase())
  );

  return (
    <div className="relative w-full p-4 flex-2 bg-white border-[1px] [border-color:#d6e4e7] shadow-lg rounded-full">
      {" "}
      {/* Input for Location */}
      <div className="relative w-full">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <input
          id="location"
          name="location"
          type="text"
          className="w-full rounded-md focus:outline-none pr-10"
          placeholder="Enter a location"
          value={location}
          onClick={() => {
            setShowSuggestions(true);
            setShowCalendar(false);
            setShowGuests(false);
          }}
          onChange={(e) => handleInputchange(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setShowCalendar(true);
              setShowSuggestions(false);
            }
          }}
        />

        {location && (
          <button
            type="button"
            onClick={() => setLocation("")}
            className="absolute flex justify-center items-center right-2 top-1/2 -translate-y-1/2 rounded-full w-5 h-5"
          >
            <span>&times;</span>
          </button>
        )}
      </div>
      {showSuggestions && (
        <ul className="absolute top-16 right-0 h-60 overflow-y-auto w-full overflow-clip rounded-2xl shadow-md bg-white border [border-color:#d6e4e7] z-10">
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="py-2 px-3 cursor-pointer hover:bg-gray-200 rounded-md"
              >
                {item}
              </li>
            ))
          ) : (
            <p>No location found</p>
          )}
        </ul>
      )}
    </div>
  );
}
