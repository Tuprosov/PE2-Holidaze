import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../js/store/userStore";
import { MenuButton } from "../Menu";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, setHostMode } = useUserStore();
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
    <div ref={menuRef}>
      <MenuButton onClick={() => setIsOpen((prev) => !prev)} />
      {isOpen && (
        <nav className="absolute z-50 top-16 right-0 w-48 bg-white rounded-2xl shadow-md border [border-color:#d6e4e7] p-4 text-center">
          <ul>
            <li>
              <Link
                to="/account"
                className="block p-2 rounded hover:bg-gray-100"
              >
                Account
              </Link>
            </li>
            <li className="border-b border-gray-200">
              <Link
                to="/profile"
                className="block p-2 rounded hover:bg-gray-100"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link to="/Help" className="block p-2 rounded hover:bg-gray-100">
                Help Center
              </Link>
            </li>
            <li>
              <Link
                to="/giftCards"
                className="block p-2 rounded hover:bg-gray-100"
              >
                Gift Cards
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setHostMode(false);
                }}
                to="/"
                className="block p-2 rounded hover:bg-gray-100"
              >
                Switch to travelling
              </Link>
            </li>
          </ul>
          <button
            className="w-full p-2 rounded"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Log out
          </button>
        </nav>
      )}
    </div>
  );
}
