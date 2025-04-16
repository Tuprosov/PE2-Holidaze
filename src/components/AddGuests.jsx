import React, { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const AddGuests = () => {
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const handleGuestChange = (type, action) => {
    setGuests((prevState) => {
      const newCount =
        action === "increase" ? prevState[type] + 1 : prevState[type] - 1;
      return {
        ...prevState,
        [type]: newCount < 0 ? 0 : newCount, // Prevent negative values
      };
    });
  };

  return (
    <div className="absolute top-12 w-[110%] rounded-2xl shadow-md bg-white border [border-color:#d6e4e7] p-4">
      <div className="flex flex-col justify-between mb-4 gap-3.5">
        <div className="flex items-center justify-between">
          <span>Adults</span>
          <div className="flex gap-4">
            <button
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={() => handleGuestChange("adults", "decrease")}
            >
              <FaMinus />
            </button>
            <span>{guests.adults}</span>
            <button
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={() => handleGuestChange("adults", "increase")}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span>Children</span>
          <div className="flex gap-4">
            <button
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={() => handleGuestChange("children", "decrease")}
            >
              <FaMinus />
            </button>
            <span>{guests.children}</span>
            <button
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={() => handleGuestChange("children", "increase")}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span>Infants</span>
          <div className="flex gap-4">
            <button
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={() => handleGuestChange("infants", "decrease")}
            >
              <FaMinus />
            </button>
            <span>{guests.infants}</span>
            <button
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={() => handleGuestChange("infants", "increase")}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span>Pets</span>
          <div className="flex gap-4">
            <button
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={() => handleGuestChange("pets", "decrease")}
            >
              <FaMinus />
            </button>
            <span>{guests.pets}</span>
            <button
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={() => handleGuestChange("pets", "increase")}
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      {/* Display total number of guests and pets */}
      <div>
        <span className="font-semibold">Total guests: </span>
        <span>{guests.adults + guests.children}</span>
        <br />
        <span className="font-semibold">Total pets: </span>
        <span>{guests.pets}</span>
      </div>
    </div>
  );
};

export default AddGuests;
