import { useState } from "react";
import { useUserStore } from "../../js/store/userStore";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { reservations } = useUserStore();

  const renderContent = () => {
    switch (activeTab) {
      case "past":
        return (
          <>
            <p>You have {reservations.past.length} past reservations.</p>
            {displayReservations()}
          </>
        );
      case "cancelled":
        return (
          <>
            <p>
              You have {reservations.cancelled.length} cancelled reservations.
            </p>
            {displayReservations()}
          </>
        );
      case "all":
        return (
          <>
            <p>You have {reservations.all.length} total reservations.</p>
            {displayReservations()}
          </>
        );
      default: // handles "upcoming" or any unexpected value
        return (
          <>
            <p>
              You have {reservations.upcoming.length} upcoming reservations.
            </p>
            {displayReservations()}
          </>
        );
    }
  };

  const displayReservations = () => {
    return (
      reservations[activeTab]?.length > 0 && (
        <ul>
          {reservations[activeTab].map((res) => (
            <li key={res.id}>
              {res.dateFrom} - {res.dateTo}
            </li>
          ))}
        </ul>
      )
    );
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
