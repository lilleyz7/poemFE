import React, { useState } from "react";
import { Link } from "react-router";
import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate login state

  const handleLogout = () => {
    // Add your logout logic here
    setIsLoggedIn(false);
    console.log("User logged out");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        PoemApp
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        {/* Always visible links */}
        <Link to="/search" className="hover:underline">
          Search Poems
        </Link>

        {!isLoggedIn ? (
          <>
            {/* Links for logged-out users */}
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </>
        ) : (
          <>
            {/* Dropdown Menu for logged-in users */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" className="hover:bg-gray-700">
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/add">Add Poem</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/saved">View Saved Poems</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Button onClick={handleLogout} variant="ghost" className="w-full text-left">
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
