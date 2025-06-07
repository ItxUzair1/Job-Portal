import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const RecruiterDashboard = () => {
  const { auth } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingJobId, setDeletingJobId] = useState(null); // Track which job is being deleted

  const fetchRecruiterJobs = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:3000/api/jobs/posted/${auth.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setJobs(data);
    } catch (error) {
      console.error("Error fetching recruiter jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle job delete
  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      setDeletingJobId(jobId);
      await axios.delete(`http://localhost:3000/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      // Remove the deleted job from state
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete job.");
    } finally {
      setDeletingJobId(null);
    }
  };

  useEffect(() => {
    if (auth.user?.id) {
      fetchRecruiterJobs();
    }
  }, [auth.user?.id]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-600">Recruiter Dashboard</h1>

      <section className="bg-white p-6 rounded-xl shadow-md mb-10 border">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Welcome, {auth.user?.email}</h2>
        <p className="text-gray-600">Here you can view and manage all the jobs you've posted.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Job Listings</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-500">You haven’t posted any jobs yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="relative border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{job.title}</h3>

                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Company:</span>{" "}
                  <span className="text-gray-800">{job.company}</span>
                </div>

                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Location:</span>{" "}
                  <span className="text-gray-800">{job.location}</span>
                </div>

                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Job Type:</span>{" "}
                  <span className="text-gray-800">{job.jobType}</span>
                </div>

                <div className="mb-1">
                  <span className="font-semibold text-gray-700">Experience Level:</span>{" "}
                  <span className="text-gray-800">{job.experienceLevel}</span>
                </div>

                <div className="mt-3">
                  <h4 className="font-semibold text-gray-700">Job Description:</h4>
                  <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                    {job.description.slice(0, 150)}...
                  </p>
                </div>

                {job.deadline && (
                  <p className="text-sm text-red-600 mt-3 font-medium">
                    Deadline: {new Date(job.deadline).toLocaleDateString()}
                  </p>
                )}

                <button
                  onClick={() => handleDelete(job._id)}
                  disabled={deletingJobId === job._id}
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold transition
                    ${
                      deletingJobId === job._id
                        ? "bg-gray-200 text-gray-500"
                        : "bg-red-100 text-red-600 hover:bg-red-200"
                    }`}
                >
                  {deletingJobId === job._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default RecruiterDashboard;
