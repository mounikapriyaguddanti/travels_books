
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-navy py-4 px-8">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.Cc3IgeTMqNI1ZTooo39thwHaGa&pid=Api&P=0&h=180"
            alt="Logo"
            className="h-12 mr-4"
          />
          <span className="text-white font-bold text-2xl">Bharat Explorer</span>
        </div>
        <div className="hidden md:flex">
          <ul className="flex space-x-8 text-white text-lg">
            <li>
              <Link to="/" className="hover:text-orangered">Home</Link>
            </li>
            <li>
              <Link to="/locations" className="hover:text-orangered">Locations</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-orangered">Accommodations</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-orangered">Packages</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-orangered">Travel Connections</Link>
            </li>
            <li>
              <Link to="/" className="hover:text-orangered">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="md:hidden">
          <button
            className="text-white hover:text-orangered focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/locations"
              className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium"
            >
              Locations
            </Link>
            <Link
              to="/"
              className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium"
            >
              Accommodations
            </Link>
            <Link
              to="/"
              className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium"
            >
              Packages
            </Link>
            <Link
              to="/"
              className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium"
            >
              Travel Connections
            </Link>
            <Link
              to="/"
              className="text-white hover:bg-gray-700 hover:text-orangered block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
