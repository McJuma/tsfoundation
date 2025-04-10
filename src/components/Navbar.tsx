import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, Heart, Users, Phone, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              {/* <Heart className="h-8 w-8 text-destructive mr-2" /> */}
              <img
                src="src/assets/images/logo.png"
                alt="Logo"
                className="h-8 w-8 text-destructive mr-2"
              />
              <span className="font-bold text-xl text-primary">
                TashaSashaFoundation
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary flex items-center"
            >
              <Home className="h-4 w-4 mr-1" />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary flex items-center"
            >
              <Users className="h-4 w-4 mr-1" />
              <span>About Us</span>
            </Link>
            <Link
              to="/get-involved"
              className="text-gray-700 hover:text-primary flex items-center"
            >
              {/* <Heart className="h-4 w-4 mr-1" /> */}
              <span>Get Involved</span>
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary flex items-center"
            >
              <Phone className="h-4 w-4 mr-1" />
              <span>Contact</span>
            </Link>
            <Link to="/donate">
              <Button variant="destructive" size="sm" className="ml-4">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <Home className="h-4 w-4 mr-2" />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <Users className="h-4 w-4 mr-2" />
              <span>About Us</span>
            </Link>
            <Link
              to="/get-involved"
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <Heart className="h-4 w-4 mr-2" />
              <span>Get Involved</span>
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary block px-3 py-2 rounded-md text-base font-medium flex items-center"
            >
              <Phone className="h-4 w-4 mr-2" />
              <span>Contact</span>
            </Link>
            <Link to="/donate">
              <Button variant="destructive" size="sm" className="mt-3 w-full">
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
