import { FaBars, FaUserCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useUserStore } from "../../js/store/userStore";
import { useNavigate, Link } from "react-router-dom";

export function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <MenuButton onClick={() => setIsOpen((prev) => !prev)} />
      {isOpen && <Navbar />}
    </div>
  );
}

export function MenuButton({ onClick }) {
  const { user } = useUserStore();
  return (
    <button
      id="menu-button"
      onClick={onClick}
      className="flex items-center gap-10 p-3 rounded-md hover:shadow-lg cursor-pointer transition bg-gray-100"
    >
      {/* Burger menu icon */}
      <FaBars className="text-xl" />
      {/* User image */}

      {user ? (
        <img
          src={user.avatar.url}
          alt={user.avatar.alt}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <FaUserCircle className="w-10 h-10 text-gray-500" />
      )}
    </button>
  );
}

function Navbar() {
  const { isLoggedIn, logout } = useUserStore();
  const navigate = useNavigate();
  return (
    <nav className="absolute z-50 top-16 right-0 w-48 bg-white rounded-2xl shadow-md border [border-color:#d6e4e7] p-4 text-center">
      <ul className="flex flex-col gap-2 text-gray-700">
        {isLoggedIn ? <LoggedInItems /> : <LoggedOutItems />}
      </ul>
      <Link
        id="button"
        to={"/hosting"}
        className="p-3 mb-2.5 xl:hidden block"
        type="button"
      >
        Switch to Hosting
      </Link>
      {isLoggedIn ? (
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="w-full p-2 rounded"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/auth")}
          className="w-full p-2 rounded"
        >
          Login
        </button>
      )}
    </nav>
  );
}

function LoggedInItems() {
  return (
    <>
      <li>
        <Link to="/trips" className="block p-2 rounded hover:bg-gray-100">
          Trips
        </Link>
      </li>
      <li>
        <Link to="/wishlist" className="block p-2 rounded hover:bg-gray-100">
          Wishlist
        </Link>
      </li>
      <li>
        <Link to="/myVenues" className="block p-2 rounded hover:bg-gray-100">
          My Venues
        </Link>
      </li>
      <li>
        <Link to="/account" className="block p-2 rounded hover:bg-gray-100">
          Account
        </Link>
      </li>
      <li>
        <Link to="/profile" className="block p-2 rounded hover:bg-gray-100">
          Profile
        </Link>
      </li>
      <li className="border-b border-gray-200">
        <Link to="/messages" className="block p-2 rounded hover:bg-gray-100">
          Messages
        </Link>
      </li>
      <LoggedOutItems />
    </>
  );
}

function LoggedOutItems() {
  return (
    <>
      <li>
        <Link to="/Help" className="block p-2 rounded hover:bg-gray-100">
          Help Center
        </Link>
      </li>
      <li>
        <Link to="/becomeHost" className="block p-2 rounded hover:bg-gray-100">
          Become host
        </Link>
      </li>
      <li>
        <Link to="/giftCards" className="block p-2 rounded hover:bg-gray-100">
          Gift Cards
        </Link>
      </li>
    </>
  );
}
