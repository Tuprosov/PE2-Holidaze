import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useEffect, useState } from "react";
import {
  useVenueStore,
  useBookingStore,
  useDateStore,
  useSearchStore,
} from "../../js/store/useStore";

export default function DatePicker({ isBooking = false }) {
  const { checkIn, checkOut, setCheckIn, setCheckOut } = useDateStore();
  const { bookings, singleVenue } = useVenueStore();
  const { setShowGuests, setShowCalendar } = useSearchStore();
  const [disabledDates, setDisabledDates] = useState([
    { before: new Date() },
    ...bookings,
  ]);
  const { setBooking, setTotalPrice } = useBookingStore();

  const handleSelect = (range) => {
    const newCheckIn = range?.from;
    const newCheckOut = range?.to;
    setCheckIn(newCheckIn);
    setCheckOut(newCheckOut);

    //automatically switch to guestselection when done with dates
    if (newCheckIn && newCheckOut && newCheckIn !== newCheckOut) {
      setShowCalendar(false);
      setShowGuests(true);
    }

    if (isBooking) {
      setBooking({ dateFrom: newCheckIn, dateTo: newCheckOut });
      setTotalPrice(
        newCheckIn && newCheckOut
          ? Math.ceil((newCheckOut - newCheckIn) / (1000 * 60 * 60 * 24)) *
              singleVenue.price
          : 0
      );
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setCheckIn(null);
    setCheckOut(null);
    setDisabledDates([{ before: new Date() }, ...bookings]);
    setBooking({ dateFrom: null, dateTo: null });
  };

  // set disabled dates, to allow user to select only available checkout afer check in set
  useEffect(() => {
    if (checkIn) {
      const nextBooking = bookings.find((b) => new Date(b.from) > checkIn);
      const previousBooking = [...bookings]
        .reverse()
        .find((b) => new Date(b.to) < checkIn);

      // disabled dates
      const disabled = [...bookings];

      if (previousBooking) {
        const earliestAllowedCheckin = new Date(previousBooking.to);
        earliestAllowedCheckin.setDate(earliestAllowedCheckin.getDate() + 1);
        disabled.unshift(
          { before: earliestAllowedCheckin },
          { before: new Date() }
        );
      } else {
        // if no previous booking, disable only past dates
        disabled.unshift({ before: new Date() });
      }

      if (nextBooking) {
        const latestAllowedCheckout = new Date(nextBooking.from);
        latestAllowedCheckout.setDate(latestAllowedCheckout.getDate() - 1);
        disabled.push({ after: latestAllowedCheckout });
      }

      setDisabledDates(disabled);
    }
  }, [bookings, checkIn]);

  return (
    <div className=" bg-white border [border-color:#d6e4e7] shadow-md rounded-2xl p-4">
      {/* Date display */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="font-semibold text-sm md:text-[1rem]">
            Check-In: {checkIn ? format(checkIn, "dd MMM") : ""}
          </span>
        </div>
        <div>
          <span className="font-semibold text-sm md:text-[1rem]">
            Check-Out: {checkOut ? format(checkOut, "dd MMM") : ""}
          </span>
        </div>
        <button onClick={handleClear} className="p-2 hover:underline ml-4">
          Clear
        </button>
      </div>

      {/* Calendar */}
      <DayPicker
        mode="range"
        startMonth={new Date()}
        selected={{ from: checkIn, to: checkOut }}
        onSelect={handleSelect}
        numberOfMonths={2}
        defaultMonth={new Date()}
        disabled={disabledDates}
        className="border-t [border-color:#d6e4e7] pt-4 text-sm md:text-[1rem]"
      />
    </div>
  );
}
