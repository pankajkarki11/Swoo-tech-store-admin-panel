// src/components/layout/Header.jsx
import React, { useState } from "react";
import { Bell, Search, Menu, Moon, Sun, User } from "lucide-react";
import Button from "../ui/Button";

const Header = ({ onMenuClick }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: "New order received", time: "2 min ago" },
    { id: 2, message: "Product out of stock", time: "1 hour ago" },
    { id: 3, message: "Monthly report ready", time: "2 hours ago" },
  ]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="small"
              className="lg:hidden mr-2"
              onClick={onMenuClick}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {searchOpen ? (
              <div className="flex-1 max-w-xl">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                    onBlur={() => setSearchOpen(false)}
                  />
                </div>
              </div>
            ) : (
              <div className="hidden md:block">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Dashboard
                </h2>
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            {/* Search button */}
            <Button
              variant="ghost"
              size="small"
              className="md:hidden"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Dark mode toggle */}
            <Button variant="ghost" size="small" onClick={toggleDarkMode}>
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button variant="ghost" size="small" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
              </Button>

              {/* Notifications dropdown */}
              <div className="hidden absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <p className="text-sm text-gray-900 dark:text-white">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 w-full text-center">
                    View all notifications
                  </button>
                </div>
              </div>
            </div>

            {/* User profile */}
            <div className="relative">
              <Button
                variant="ghost"
                size="small"
                className="flex items-center"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="hidden md:inline ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Admin
                </span>
              </Button>

              {/* Profile dropdown */}
              <div className="hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Admin User
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    admin@swootechmart.com
                  </p>
                </div>
                <div className="py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Your Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Settings
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Support
                  </button>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
