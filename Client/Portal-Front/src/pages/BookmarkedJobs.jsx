import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // adjust path as needed
import { Link } from 'react-router-dom';

const BookmarkedJobsPage = () => {
  const { auth } = useContext(AuthContext);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchBookmarkedJobs = async () => {
    // Wait until token and user ID are available
    if (!auth?.user?.id || !auth?.token) {
      // Wait 300ms and try again
      setTimeout(fetchBookmarkedJobs, 300);
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:3000/api/jobs/bookmarked/${auth.user.id}`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setBookmarkedJobs(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch bookmarked jobs.');
    } finally {
      setLoading(false);
    }
  };

  fetchBookmarkedJobs();
}, [auth]);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 text-xl">{error}</p>;
  }

  if (bookmarkedJobs.length === 0) {
    return <p className="text-center text-gray-600 text-lg">No bookmarked jobs found.</p>;
  }

  return (
    <section className="max-w-5xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6">Your Bookmarked Jobs</h1>
      <div className="grid gap-6">
        {bookmarkedJobs.map((job) => (
          <div
            key={job._id}
            className="bg-white shadow-md p-4 rounded-lg border hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <Link
                to={`/job/${job._id}`}
                className="text-indigo-600 hover:underline text-sm"
              >
                View Details
              </Link>
            </div>
            <p className="text-gray-600"><strong>Company:</strong> {job.company}</p>
            <p className="text-gray-500 text-sm">
              Location: {job.location} | Type: {job.jobType}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookmarkedJobsPage;
