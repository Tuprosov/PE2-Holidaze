import {
  FaWifi,
  FaParking,
  FaTv,
  FaSnowflake,
  FaUtensils,
  FaDog,
  FaSwimmingPool,
  FaDumbbell,
} from "react-icons/fa";

const amenitiesList = [
  { name: "Wi-Fi", icon: <FaWifi /> },
  { name: "Free Parking", icon: <FaParking /> },
  { name: "TV", icon: <FaTv /> },
  { name: "Air Conditioning", icon: <FaSnowflake /> },
  { name: "Kitchen", icon: <FaUtensils /> },
  { name: "Pet Friendly", icon: <FaDog /> },
  { name: "Pool", icon: <FaSwimmingPool /> },
  { name: "Gym", icon: <FaDumbbell /> },
];

export default function Amenities() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-6 w-[60%]">
      {amenitiesList.map((item) => (
        <div
          key={item.name}
          className="flex items-center space-x-2 text-gray-700"
        >
          <span className="text-xl text-primary">{item.icon}</span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
