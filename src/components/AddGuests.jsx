import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useGuestStore } from "../js/store/useStore";

const AddGuests = () => {
  const { adults, children, infants, pets, total, decrement, increment } =
    useGuestStore();

  return (
    <div className="absolute top-12 w-[110%] rounded-2xl shadow-md bg-white border [border-color:#d6e4e7] p-4">
      <div className="flex flex-col justify-between mb-4 gap-3.5">
        <div className="flex items-center justify-between ">
          <span>Adults</span>
          <div className="flex gap-4 ">
            <button
              type="button"
              disabled={adults === 0}
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                decrement("adults");
              }}
            >
              <FaMinus />
            </button>
            <span className="min-w-[11px]">{adults}</span>
            <button
              type="button"
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                increment("adults");
              }}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span>Children</span>
          <div className="flex gap-4 ">
            <button
              type="button"
              disabled={children === 0}
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={(e) => {
                decrement("children");
                e.stopPropagation();
              }}
            >
              <FaMinus />
            </button>
            <span className="min-w-[11px]">{children}</span>
            <button
              type="button"
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={(e) => {
                increment("children");
                e.stopPropagation();
              }}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span>Infants</span>
          <div className="flex gap-4 ">
            <button
              type="button"
              disabled={infants === 0}
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={(e) => {
                decrement("infants");
                e.stopPropagation();
              }}
            >
              <FaMinus />
            </button>
            <span className="min-w-[11px]">{infants}</span>
            <button
              type="button"
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={(e) => {
                increment("infants");
                e.stopPropagation();
              }}
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span>Pets</span>
          <div className="flex gap-4 ">
            <button
              type="button"
              disabled={pets === 0}
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={(e) => {
                decrement("pets");
                e.stopPropagation();
              }}
            >
              <FaMinus />
            </button>
            <span className="min-w-[11px]">{pets}</span>
            <button
              type="button"
              className="flex items-center bg-indigo-500 text-white p-2 rounded-full"
              onClick={(e) => {
                increment("pets");
                e.stopPropagation();
              }}
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      {/* Display total number of guests and pets */}
      <div>
        <span className="font-semibold">Total guests: </span>
        <span>{total}</span>
        <br />
        <span className="font-semibold">Total pets: </span>
        <span>{pets}</span>
      </div>
    </div>
  );
};

export default AddGuests;
