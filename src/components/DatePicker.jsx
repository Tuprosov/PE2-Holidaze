import { useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function DatePicker() {
  const [range, setRange] = useState({ from: undefined, to: undefined });

  const handleSelect = (range) => {
    setRange(range);
  };

  const handleClear = () => {
    setRange({ from: undefined, to: undefined });
  };

  return (
    <div className="absolute min-w-[700px] top-16 left-1/2 transform -translate-x-1/2 bg-white border [border-color:#d6e4e7] shadow-md rounded-2xl p-4">
      {/* Date display */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <span className="font-semibold">Check-In: </span>
          {range.from ? format(range.from, "dd MMM") : "Not selected"}
        </div>
        <div>
          <span className="font-semibold">Check-Out: </span>
          {range.to ? format(range.to, "dd MMM") : "Not selected"}
        </div>
        <button onClick={handleClear} className="p-2 hover:underline ml-4">
          Clear
        </button>
      </div>

      {/* Calendar */}
      <DayPicker
        mode="range"
        selected={range}
        onSelect={handleSelect}
        numberOfMonths={2}
        defaultMonth={new Date()}
        disabled={{ before: new Date() }}
        className="border-t [border-color:#d6e4e7] pt-4"
      />
    </div>
  );
}
