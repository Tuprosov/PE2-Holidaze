import React from "react";

const categories = ["adults", "children", "infants", "pets"];

export default function GuestsSelector({ guests, setGuests }) {
  const handleChange = (type, amount) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + amount),
    }));
  };

  return (
    <div className="space-y-3">
      {categories.map((cat) => (
        <div key={cat} className="flex justify-between items-center">
          <span className="capitalize">{cat}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleChange(cat, -1)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{guests[cat]}</span>
            <button
              onClick={() => handleChange(cat, 1)}
              className="px-2 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
