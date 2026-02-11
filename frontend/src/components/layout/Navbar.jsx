import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src={logo}
                alt="Sticobytes Logo"
                className="h-10 w-auto transition-transform group-hover:scale-105"
              />
              <span className="text-2xl font-bold text-primary-600 group-hover:text-primary-700 transition-colors">
                Sticobytes
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              About
            </Link>
            <Link
              to="/services"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Services
            </Link>
            <Link
              to="/blog"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/gadgets"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Gadgets
            </Link>
            <Link
              to="/team"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Team
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary-600 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-600 focus:outline-none transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/services"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
              onClick={toggleMenu}
            >
              Blog
            </Link>
            <Link
              to="/gadgets"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
              onClick={toggleMenu}
            >
              Gadgets
            </Link>
            <Link
              to="/team"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
              onClick={toggleMenu}
            >
              Team
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
