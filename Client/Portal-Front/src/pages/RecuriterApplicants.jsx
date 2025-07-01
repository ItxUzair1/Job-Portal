import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const RecruiterApplicants = () => {
  const { auth } = useContext(AuthContext);
  const [jobApplicants, setJobApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get applicant status from localStorage
  const getStatusFromStorage = (jobId, applicantId) => {
    const data = JSON.parse(localStorage.getItem('applicationStatus')) || {};
    return data[`${jobId}_${applicantId}`] || null;
  };

  const setStatusInStorage = (jobId, applicantId, status) => {
    const data = JSON.parse(localStorage.getItem('applicationStatus')) || {};
    data[`${jobId}_${applicantId}`] = status;
    localStorage.setItem('applicationStatus', JSON.stringify(data));

    // if rejected, also remove "applied" status from localStorage
    if (status === 'rejected') {
      const applied = JSON.parse(localStorage.getItem('appliedJobs')) || {};
      delete applied[jobId];
      localStorage.setItem('appliedJobs', JSON.stringify(applied));
    }
  };

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/jobs/recruiter/${auth.user.id}/applicants`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setJobApplicants(res.data);
      } catch (err) {
        setError('Failed to load applicants.');
      } finally {
        setLoading(false);
      }
    };

    if (auth?.user?.id) {
      fetchApplicants();
    }
  }, [auth]);

  const handleDecision = (jobId, applicantId, decision) => {
    setStatusInStorage(jobId, applicantId, decision);
    setJobApplicants((prev) =>
      prev.map((job) => {
        if (job.jobId === jobId) {
          return {
            ...job,
            applicants: job.applicants.map((applicant) => {
              if (applicant._id === applicantId) {
                return { ...applicant, decision };
              }
              return applicant;
            }),
          };
        }
        return job;
      })
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-indigo-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  return (
    <section className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Applicants for Your Jobs</h1>
      {jobApplicants.length === 0 ? (
        <p className="text-gray-500">No job postings found or no applicants yet.</p>
      ) : (
        jobApplicants.map((job) => (
          <div key={job.jobId} className="mb-8 border border-gray-200 rounded-lg p-4 shadow-sm">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-3">{job.title}</h2>
            {job.applicants.length === 0 ? (
              <p className="text-gray-500 italic">No applicants yet.</p>
            ) : (
              <ul className="space-y-3">
                {job.applicants.map((applicant) => {
                  const decision = getStatusFromStorage(job.jobId, applicant._id);

                  return (
                    <li
                      key={applicant._id}
                      className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md border hover:bg-gray-100 transition"
                    >
                      <div>
                        <p className="text-gray-800 font-medium">{applicant.name}</p>
                        <p className="text-gray-500 text-sm">{applicant.email}</p>
                        {decision && (
                          <span
                            className={`inline-block mt-1 text-xs px-2 py-1 rounded ${
                              decision === 'accepted'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {decision}
                          </span>
                        )}
                      </div>
                      {!decision && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDecision(job.jobId, applicant._id, 'accepted')}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleDecision(job.jobId, applicant._id, 'rejected')}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))
      )}
    </section>
  );
};

export default RecruiterApplicants;
