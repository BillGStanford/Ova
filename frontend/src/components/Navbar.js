import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { 
  Home, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Settings, 
  User,
  BookIcon
} from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-amber-50/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo with Modern Typography */}
        <Link 
          to="/home" 
          className="flex items-center space-x-3 group"
        >
          <BookIcon className="w-10 h-10 text-amber-700" />
          <span className="text-3xl font-bold text-amber-900 group-hover:text-amber-700 transition-colors duration-300">
            Ova
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Navigation Links */}
          <div className="flex items-center space-x-6 bg-amber-100 rounded-full px-6 py-2">
            <Link 
              to="/home" 
              className="flex items-center space-x-2 text-amber-800 hover:text-amber-600 transition-colors group"
            >
              <Home className="text-amber-600 group-hover:text-amber-700 transition-colors" size={20} />
              <span className="font-medium">Home</span>
            </Link>

            <div className="w-px h-6 bg-amber-300 mx-4"></div>

            <Link 
              to="/coming-soon" 
              className="flex items-center space-x-2 text-amber-800 hover:text-amber-600 transition-colors group"
            >
              <Bell className="text-amber-600 group-hover:text-amber-700 transition-colors" size={20} />
              <span className="font-medium">Coming Soon</span>
            </Link>
          </div>

          {/* User Actions */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 bg-amber-100 hover:bg-amber-200 rounded-full px-4 py-2 transition-all group"
            >
              <User className="text-amber-700" size={20} />
              <span className="text-amber-900 font-medium">Profile</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-2xl rounded-xl ring-1 ring-black/5">
                <div className="py-1">
                  <Link 
                    to="/settings"
                    className="flex items-center px-4 py-2 text-amber-800 hover:bg-amber-50"
                  >
                    <Settings size={16} className="mr-3 text-amber-600" />
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 text-left"
                  >
                    <LogOut size={16} className="mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-amber-800 hover:text-amber-600 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-white shadow-lg z-50">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link 
              to="/home" 
              className="block py-3 px-4 hover:bg-amber-50 rounded-lg text-amber-800 flex items-center space-x-3"
            >
              <Home size={20} className="text-amber-600" />
              <span>Home</span>
            </Link>
            <Link 
              to="/coming-soon" 
              className="block py-3 px-4 hover:bg-amber-50 rounded-lg text-amber-800 flex items-center space-x-3"
            >
              <Bell size={20} className="text-amber-600" />
              <span>Coming Soon</span>
            </Link>
            <Link 
              to="/settings" 
              className="block py-3 px-4 hover:bg-amber-50 rounded-lg text-amber-800 flex items-center space-x-3"
            >
              <Settings size={20} className="text-amber-600" />
              <span>Settings</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left block py-3 px-4 hover:bg-red-50 rounded-lg text-red-600 flex items-center space-x-3"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;