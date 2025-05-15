import { useState } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const renderContent = () => {
    switch (activeTab) {
      case "upcoming":
        return <p>You have X upcoming reservations.</p>;
      case "past":
        return <p>You have Y past reservations.</p>;
      case "cancelled":
        return <p>You have Z cancelled reservations.</p>;
      case "all":
        return <p>All reservations.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="mb-8">
      {/* tabs */}
      <div className="flex space-x-4 mb-4">
        {["upcoming", "past", "cancelled", "all"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-medium ${
              activeTab === tab
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* tab Content */}
      <div className="p-4 bg-gray-100 rounded">{renderContent()}</div>
    </div>
  );
}
