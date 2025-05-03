import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="bg-blue-50 min-h-screen flex flex-col justify-center items-center px-4 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-blue-700 mb-6">
          Find Your Dream Job with <span className="text-blue-900">HireNest</span>
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-xl mb-8">
          Connect with top companies and take the next step in your career.
        </p>
        <Link to={"/allJobs"}><button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition cursor-pointer">
          Browse Jobs
        </button></Link>
      </section>
    </>
  );
};

export default Home;
