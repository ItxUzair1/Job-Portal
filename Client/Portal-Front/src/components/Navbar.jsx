import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Menu, X } from "lucide-react"; // Lucide icons

const Navbar = () => {
  const { auth, Logout } = useContext(AuthContext);
  const user = auth?.user;
  const avatarLetter = user?.email?.charAt(0).toUpperCase();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md px-4 md:px-8 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-3xl font-bold text-white hover:text-yellow-300 transition">
          HireNest
        </Link>

        {/* Hamburger Menu (Mobile) */}
        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {!user ? (
            <>
              <Link to="/login" className="text-white hover:text-yellow-300 text-lg transition">
                Sign In
              </Link>
              <Link
                to="/recruiter"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-lg transition"
              >
                Recruiter
              </Link>
            </>
          ) : (
            <>
              {user.role === "jobseeker" && (
                <>
                  <Link to="/allJobs" className="text-white hover:text-yellow-300 text-lg transition">
                    Browse Jobs
                  </Link>
                  <Link to="/applications" className="text-white hover:text-yellow-300 text-lg transition">
                    My Applications
                  </Link>
                  <Link to="/saved" className="text-white hover:text-yellow-300 text-lg transition">
                    Saved Jobs
                  </Link>
                </>
              )}
              {user.role === "recruiter" && (
                <>
                  <Link to="/dashboard" className="text-white hover:text-yellow-300 text-lg transition">
                    Dashboard
                  </Link>
                  <Link to="/post-job" className="text-white hover:text-yellow-300 text-lg transition">
                    Post Job
                  </Link>
                  <Link to="/candidates" className="text-white hover:text-yellow-300 text-lg transition">
                    Candidates
                  </Link>
                </>
              )}
              {/* Avatar and Logout */}
              <div className="flex items-center space-x-4">
                <div
                  title={user.email}
                  className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-semibold text-lg"
                >
                  {avatarLetter}
                </div>
                <button
                  onClick={Logout}
                  className="text-white hover:text-red-500 text-lg transition"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-3">
          {!user ? (
            <>
              <Link to="/login" className="block text-white hover:text-yellow-300 text-lg transition">
                Sign In
              </Link>
              <Link
                to="/recruiter"
                className="block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-lg transition"
              >
                Recruiter
              </Link>
            </>
          ) : (
            <>
              {user.role === "jobseeker" && (
                <>
                  <Link to="/allJobs" className="block text-white hover:text-yellow-300 text-lg transition">
                    Browse Jobs
                  </Link>
                  <Link to="/applications" className="block text-white hover:text-yellow-300 text-lg transition">
                    My Applications
                  </Link>
                  <Link to="/saved" className="block text-white hover:text-yellow-300 text-lg transition">
                    Saved Jobs
                  </Link>
                </>
              )}
              {user.role === "recruiter" && (
                <>
                  <Link to="/dashboard" className="block text-white hover:text-yellow-300 text-lg transition">
                    Dashboard
                  </Link>
                  <Link to="/post-job" className="block text-white hover:text-yellow-300 text-lg transition">
                    Post Job
                  </Link>
                  <Link to="/candidates" className="block text-white hover:text-yellow-300 text-lg transition">
                    Candidates
                  </Link>
                </>
              )}
              {/* Avatar and Logout */}
              <div className="flex items-center space-x-4 mt-4">
                <div
                  title={user.email}
                  className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-semibold text-lg"
                >
                  {avatarLetter}
                </div>
                <button
                  onClick={Logout}
                  className="text-white hover:text-red-500 text-lg transition"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
