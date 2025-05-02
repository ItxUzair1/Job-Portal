import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">HireNest</Link>
      <div className="space-x-4">
        <Link to="/login" className="text-gray-700 hover:text-blue-600">Sign In</Link>
        <Link to="/recruiter" className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md">Recruiter</Link>
      </div>
    </nav>
  );
};

export default Navbar;
