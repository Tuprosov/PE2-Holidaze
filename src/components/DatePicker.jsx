import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useDateStore, useSearchStore } from "../js/store/useStore";
import { useRef } from "react";

export default function DatePicker() {
  const { checkIn, checkOut, setCheckIn, setCheckOut } = useDateStore();
  const { setShowCalendar } = useSearchStore();
  const previousCheckInRef = useRef(checkIn);

  const handleSelect = (range) => {
    const newCheckIn = range?.from;
    const newCheckOut = range?.to;

    if (newCheckIn && newCheckIn !== previousCheckInRef.current) {
      setCheckIn(newCheckIn);
      setCheckOut(null); // Reset checkout if new check-in is chosen
      previousCheckInRef.current = newCheckIn; // Update ref manually
      console.log("executing1");
    }

    if (newCheckIn && newCheckOut) {
      setCheckIn(newCheckIn);
      setCheckOut(newCheckOut);
      console.log("executing2");
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setCheckIn(null);
    setCheckOut(null);
  };

  return (
    <div className="absolute min-w-[700px] top-16 left-1/2 transform -translate-x-1/2 bg-white border [border-color:#d6e4e7] shadow-md rounded-2xl p-4">
      {/* Date display */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="font-semibold">
            Check-In: {checkIn ? format(checkIn, "dd MMM") : "Not selected"}{" "}
          </span>
        </div>
        <div>
          <span className="font-semibold">
            Check-Out: {checkOut ? format(checkOut, "dd MMM") : "Not selected"}
          </span>
        </div>
        <button onClick={handleClear} className="p-2 hover:underline ml-4">
          Clear
        </button>
      </div>

      {/* Calendar */}
      <DayPicker
        mode="range"
        selected={{ from: checkIn, to: checkOut }}
        onSelect={handleSelect}
        numberOfMonths={2}
        defaultMonth={new Date()}
        disabled={{ before: new Date() }}
        className="border-t [border-color:#d6e4e7] pt-4"
      />
    </div>
  );
}
