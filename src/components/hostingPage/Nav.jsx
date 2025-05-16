import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul className="flex gap-4 text-gray-700">
        <li>
          <Link
            to="/userVenues"
            className="block p-2 rounded hover:bg-gray-100"
          >
            Listings
          </Link>
        </li>
        <li>
          <Link to="/messages" className="block p-2 rounded hover:bg-gray-100">
            Messages
          </Link>
        </li>
        <li>
          <Link to="/item" className="block p-2 rounded hover:bg-gray-100">
            Item
          </Link>
        </li>
        <li>
          <Link to="/item" className="block p-2 rounded hover:bg-gray-100">
            Item
          </Link>
        </li>
      </ul>
    </nav>
  );
}
