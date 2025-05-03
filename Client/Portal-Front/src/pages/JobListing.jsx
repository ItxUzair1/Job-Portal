import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { JobCard } from '../components/JobCard'; // Import the JobCard component

const JobListingPage = () => {
  // State to store job data
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs from the API when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/jobs/all');
        setJobs(response.data); // Store job data in state
        setLoading(false); // Stop the loading state
      } catch (err) {
        setError('Failed to load jobs. Please try again.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Display loading state or error if something went wrong
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
    
  }

  if (error) {
    return <p className="text-center text-xl text-red-500">{error}</p>;
  }

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 md:px-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Latest Job Listings
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </section>
  );
};

export default JobListingPage;
