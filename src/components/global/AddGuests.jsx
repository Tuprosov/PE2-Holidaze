import { useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import {
  useGuestStore,
  useVenueStore,
  useBookingStore,
} from "../../js/store/useStore";

export default function AddGuests({ isBooking = false }) {
  const {
    adults,
    children,
    infants,
    pets,
    total,
    decrement,
    increment,
    resetGuests,
  } = useGuestStore();
  const { singleVenue } = useVenueStore();
  const { setBooking } = useBookingStore();

  useEffect(() => {
    if (isBooking) setBooking({ guests: total });
  }, [total, setBooking]);

  return (
    <div className="relative shadow-md bg-white border [border-color:#d6e4e7] rounded-2xl p-4 min-h-72">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          resetGuests();
        }}
        className="p-2 hover:underline absolute bottom-2 right-2"
      >
        Clear
      </button>
      <div className="flex flex-col justify-between mb-6 gap-3.5">
        <div className="flex items-center justify-between ">
          <span>Adults</span>
          <div className="flex gap-4 ">
            <button
              type="button"
              disabled={adults === 0}
              className="flex items-center p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                decrement("adults");
              }}
            >
              <FaMinus />
            </button>
            <span className="min-w-[11px]">{adults}</span>
            <button
              disabled={total === singleVenue?.maxGuests}
              type="button"
              className="flex items-center p-2 rounded-full"
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
              className="flex items-center p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                decrement("children");
              }}
            >
              <FaMinus />
            </button>
            <span className="min-w-[11px]">{children}</span>
            <button
              type="button"
              disabled={total === singleVenue?.maxGuests}
              className="flex items-center p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                increment("children");
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
              className="flex items-center p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                decrement("infants");
              }}
            >
              <FaMinus />
            </button>
            <span className="min-w-[11px]">{infants}</span>
            <button
              type="button"
              disabled={total === singleVenue?.maxGuests}
              className="flex items-center p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                increment("infants");
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
              className="flex items-center p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                decrement("pets");
              }}
            >
              <FaMinus />
            </button>
            <span className="min-w-[11px]">{pets}</span>
            <button
              type="button"
              disabled={singleVenue?.meta?.pets === false}
              className="flex items-center p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                increment("pets");
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
}
