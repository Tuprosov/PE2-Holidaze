import { Link } from "react-router-dom";
import { FaUser, FaKey, FaHome, FaBell, FaShieldAlt } from "react-icons/fa";

const settings = [
  {
    title: "Account Info",
    description: "Manage your personal details and email",
    icon: <FaUser className="text-xl text-gray-600" />,
    path: "/account/info",
  },
  {
    title: "Change Password",
    description: "Update your password regularly",
    icon: <FaKey className="text-xl text-gray-600" />,
    path: "/account/password",
  },
  {
    title: "Your Listings",
    description: "View and edit your venues",
    icon: <FaHome className="text-xl text-gray-600" />,
    path: "/account/listings",
  },
  {
    title: "Notifications",
    description: "Manage push and email preferences",
    icon: <FaBell className="text-xl text-gray-600" />,
    path: "/account/notifications",
  },
  {
    title: "Privacy & Security",
    description: "Review privacy settings and permissions",
    icon: <FaShieldAlt className="text-xl text-gray-600" />,
    path: "/account/privacy",
  },
];

export default function DisplayAccount() {
  return (
    <div className="max-w-6xl mx-auto p-4 mb-6">
      <div className="mb-6">
        <Link
          to="/"
          className="text-blue-600 underline font-semibold hover:text-blue-800"
        >
          ← Back to home
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {settings.map((item) => (
          <li key={item.title} to={item.path}>
            <Link className="flex flex-col items-start gap-4 p-4 border rounded-xl shadow hover:shadow-md transition bg-white">
              <div>{item.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
