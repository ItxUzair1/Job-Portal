import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { JobCard } from '../components/JobCard';
import SearchBar from '../components/SearchBar'; // Import SearchBar

const JobListingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/jobs/all');
        setJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load jobs. Please try again.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs on search input
  useEffect(() => {
    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(lowercasedSearch)
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

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
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Latest Job Listings
      </h2>
      
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {filteredJobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </section>
  );
};

export default JobListingPage;
