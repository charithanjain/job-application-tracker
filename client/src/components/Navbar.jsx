import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const { token, logout, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const linkStyle = "block px-3 py-2 rounded transition duration-200";
  const activeStyle = "bg-white text-blue-600";
  const normalStyle = "text-white hover:bg-blue-500";

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <NavLink
          to="/dashboard"
          className="text-lg font-bold"
          onClick={() => setIsOpen(false)}
        >
          Job Tracker
        </NavLink>

        {/* Hamburger (mobile only) */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <NavLink
            to="/analytics"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            Analytics
          </NavLink>

          {token ? (
            <>
              <span className="font-medium">Hello, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-white text-blue-600 px-3 py-1 rounded font-semibold hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? activeStyle : normalStyle}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? activeStyle : normalStyle}`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <NavLink
            to="/analytics"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : normalStyle}`
            }
          >
            Analytics
          </NavLink>

          {token ? (
            <>
              <div className="px-3 py-2 font-medium">Hello, {user?.name}</div>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full text-left bg-white text-blue-600 px-3 py-2 rounded font-semibold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? activeStyle : normalStyle}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? activeStyle : normalStyle}`
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
