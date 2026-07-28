import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const fullName = localStorage.getItem("fullName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("fullName");
    localStorage.removeItem("email");

    toast.success("Logged out successfully!");

    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold hover:text-gray-200"
          onClick={closeMenu}
        >
          📰 NewsMania
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-gray-200">
            🏠 Home
          </Link>

          {token ? (
            <>
              <Link to="/bookmarks" className="hover:text-gray-200">
                ⭐ Bookmarks
              </Link>

              <Link to="/profile" className="hover:text-gray-200">
                👤 Profile
              </Link>

              <span className="font-semibold">
                👋 Hi, {fullName}
              </span>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">
                🔑 Login
              </Link>

              <Link to="/register" className="hover:text-gray-200">
                📝 Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-6 py-4 flex flex-col gap-4">

          <Link to="/" onClick={closeMenu}>
            🏠 Home
          </Link>

          {token ? (
            <>
              <Link to="/bookmarks" onClick={closeMenu}>
                ⭐ Bookmarks
              </Link>

              <Link to="/profile" onClick={closeMenu}>
                👤 Profile
              </Link>

              <span>👋 Hi, {fullName}</span>

              <button
                onClick={() => {
                  closeMenu();
                  handleLogout();
                }}
                className="bg-red-500 py-2 rounded-lg"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                🔑 Login
              </Link>

              <Link to="/register" onClick={closeMenu}>
                📝 Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;