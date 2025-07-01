import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaBriefcase,
  FaCalendarAlt,
  FaBookmark,
  FaRegBookmark,
} from 'react-icons/fa';
import { AuthContext } from '../context/authContext';

const JobDetailsPage = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  // Load bookmark status from localStorage
  useEffect(() => {
    const bookmarkStatus = localStorage.getItem(`bookmark-${id}`);
    setIsBookmarked(bookmarkStatus === 'true');
  }, [id]);

  // Load apply status from localStorage
  useEffect(() => {
    const appliedStatus = localStorage.getItem(`applied-${id}`);
    if (appliedStatus === 'true') {
      setIsApplied(true);
    }
  }, [id]);

  // Fetch job details from backend
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/jobs/${id}`);
        setJob(response.data);
      } catch (err) {
        setError('Failed to fetch job details.');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Sync isApplied with backend (in case localStorage is cleared or new login)
  useEffect(() => {
    if (auth?.user && job?.appliedCandidates) {
      const hasApplied = job.appliedCandidates.includes(auth.user.id);
      setIsApplied(hasApplied);
      if (hasApplied) {
        localStorage.setItem(`applied-${job._id}`, 'true');
      }
    }
  }, [auth, job]);

  // Bookmark toggle
  const handleBookmarkClick = async () => {
    if (!auth?.token) {
      alert('Please log in to bookmark this job.');
      return;
    }

    try {
      if (isBookmarked) {
        await axios.delete(
          `http://localhost:3000/api/jobs/bookmark/${auth.user.id}/${id}`,
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        localStorage.setItem(`bookmark-${id}`, 'false');
      } else {
        await axios.post(
          `http://localhost:3000/api/jobs/bookmark/${auth.user.id}/${id}`,
          {},
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        localStorage.setItem(`bookmark-${id}`, 'true');
      }

      setIsBookmarked((prev) => !prev);
    } catch (err) {
      console.error('Bookmark action failed:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  // Apply handler
  const handleApply = async () => {
    if (!auth?.token) {
      alert('Please log in to apply for this job.');
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/api/jobs/apply/${job._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      alert('Applied successfully!');
      setIsApplied(true);
      localStorage.setItem(`applied-${job._id}`, 'true');
    } catch (error) {
      console.error('Error applying:', error);
      alert('Failed to apply for the job.');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error state
  if (error || !job) {
    return <p className="text-center text-red-500 text-xl">{error}</p>;
  }

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
        <button onClick={handleBookmarkClick} className="text-xl hover:text-indigo-600">
          {isBookmarked ? (
            <FaBookmark className="text-indigo-600" />
          ) : (
            <FaRegBookmark className="text-gray-400" />
          )}
        </button>
      </div>

      <p className="text-lg text-gray-600 mb-2">
        <strong>Company:</strong> {job.company}
      </p>

      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
        <span className="flex items-center gap-1">
          <FaMapMarkerAlt /> {job.location}
        </span>
        <span className="flex items-center gap-1">
          <FaMoneyBillWave /> ${job.salary.min} - ${job.salary.max}
        </span>
        <span className="flex items-center gap-1">
          <FaBriefcase /> {job.jobType}
        </span>
        <span className="flex items-center gap-1">
          <FaClock /> {job.experienceLevel} Level
        </span>
        <span className="flex items-center gap-1">
          <FaCalendarAlt /> Deadline:{' '}
          {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A'}
        </span>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Job Description</h2>
        <p className="text-gray-700">{job.description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Requirements</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center border-t pt-4">
        <p className="text-sm text-gray-400">
          Posted on {new Date(job.createdAt).toLocaleDateString()}
        </p>

        {isApplied ? (
          <span className="px-4 py-2 bg-gray-300 text-gray-700 rounded cursor-not-allowed">
            Already Applied
          </span>
        ) : (
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
          >
            Apply Now
          </button>
        )}
      </div>
    </section>
  );
};

export default JobDetailsPage;
