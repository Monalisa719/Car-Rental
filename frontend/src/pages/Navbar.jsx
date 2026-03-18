import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FiMenu, FiX, FiUser, FiLogIn } from "react-icons/fi";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { setCarToken } = useContext(AppContext);

  const Handlelogout = () => {
    localStorage.removeItem('carToken');
    setCarToken('');
    navigate('/login');
  };


  return (
    <nav className="bg-gray-900 border-b border-gray-800 text-gray-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl mr-2 text-amber-500">🏎️</span>
            <Link 
              to="/" 
              className="text-xl font-bold bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent hover:text-amber-400 transition duration-300"
            >
              RentMyRide
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              <Link 
                to="/" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-amber-400 transition duration-300"
              >
                Home
              </Link>
              <Link 
                to="/cars" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-amber-400 transition duration-300"
              >
                Cars
              </Link>
              <Link 
                to="/about" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-amber-400 transition duration-300"
              >
                Our Story
              </Link>
              <Link 
                to="/contact" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-amber-400 transition duration-300"
              >
                Concierge
              </Link>
              <div className="ml-4 flex items-center space-x-2">
                <Link 
                  onClick={Handlelogout} 
                  className="px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 border border-gray-700 hover:bg-gray-800 hover:border-amber-400 hover:text-amber-400 transition duration-300"
                >
                  <FiLogIn className="text-sm" /> Logout
                </Link>
                <Link 
                  to="/add-car" 
                  className="px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-gray-90 transition duration-300"
                >
                  <FiUser className="text-sm" /> Add Car
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-amber-400 hover:bg-gray-800 focus:outline-none transition duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-amber-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/cars"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-amber-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Cars
            </Link>
            <Link
              to="/cars"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-amber-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-amber-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Concierge
            </Link>
            <div className="pt-4 pb-2 border-t border-gray-800 space-y-2">
              <Link
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-amber-400 transition duration-300"
                onClick={Handlelogout}
              >
                <FiLogIn /> Logout
              </Link>
              <Link
                to="/add-car"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-gray-900 transition duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiUser /> Add Car
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;