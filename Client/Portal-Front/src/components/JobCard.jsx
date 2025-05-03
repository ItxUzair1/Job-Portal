import React from 'react';
import { Link } from 'react-router-dom';

export const JobCard = ({ job }) => {
  return (
    <Link to={`/job/${job._id}`}>
      <div className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-200">
            {job.title}
          </h3>
          <p className="text-sm text-gray-500 mt-2">{job.company}</p>
          
          <div className="flex items-center space-x-4 mt-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Salary:</span> ${job.salary.min} - ${job.salary.max}
            </p>
            <p className="text-sm text-gray-600 font-semibold">{job.jobType}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 flex justify-between items-center">
          <span className="text-indigo-600 font-semibold">Apply Now</span>
          <p className="text-xs text-gray-400">Posted 3 days ago</p>
        </div>
      </div>
    </Link>
  );
};
