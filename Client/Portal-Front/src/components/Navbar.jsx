import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext"; // Adjust the import path as needed

const Navbar = () => {
  const { auth, Logout } = useContext(AuthContext);
  const user = auth?.user;
  
  // Get the first letter of the email for the avatar
  const avatarLetter = user?.email?.charAt(0).toUpperCase();

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 shadow-md py-4 px-8 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="text-3xl font-extrabold text-white hover:text-yellow-300 transition duration-300 ease-in-out">
        HireNest
      </Link>

      <div className="flex items-center space-x-6">
        {/* If the user is not logged in */}
        {!user && (
          <>
            <Link
              to="/login"
              className="text-white hover:text-yellow-300 transition duration-300 ease-in-out text-lg"
            >
              Sign In
            </Link>
            <Link
              to="/recruiter"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-lg transition duration-300 ease-in-out"
            >
              Recruiter
            </Link>
          </>
        )}

        {/* If user is a Job Seeker */}
        {user && user.role === "jobseeker" && (
          <>
            <Link
              to="/jobs"
              className="text-white hover:text-yellow-300 transition duration-300 ease-in-out text-lg"
            >
              Browse Jobs
            </Link>
            <Link
              to="/applications"
              className="text-white hover:text-yellow-300 transition duration-300 ease-in-out text-lg"
            >
              My Applications
            </Link>
            <Link
              to="/saved"
              className="text-white hover:text-yellow-300 transition duration-300 ease-in-out text-lg"
            >
              Saved Jobs
            </Link>
          </>
        )}

        {/* If user is a Recruiter */}
        {user && user.role === "recruiter" && (
          <>
            <Link
              to="/dashboard"
              className="text-white hover:text-yellow-300 transition duration-300 ease-in-out text-lg"
            >
              Dashboard
            </Link>
            <Link
              to="/post-job"
              className="text-white hover:text-yellow-300 transition duration-300 ease-in-out text-lg"
            >
              Post Job
            </Link>
            <Link
              to="/candidates"
              className="text-white hover:text-yellow-300 transition duration-300 ease-in-out text-lg"
            >
              Candidates
            </Link>
          </>
        )}

        {/* User Avatar & Logout */}
        {user && (
          <div className="flex items-center space-x-4">
            <div
              title={user.email}
              className="w-10 h-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-semibold text-lg"
            >
              {avatarLetter}
            </div>
            <button
              onClick={Logout}
              className="text-white cursor-pointer hover:text-red-500 transition duration-300 ease-in-out text-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
