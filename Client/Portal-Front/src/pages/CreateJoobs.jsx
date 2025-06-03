import { useState } from "react";
import axios from "axios";

const CreateJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
    jobType: "",
    experienceLevel: "Fresher",
    category: "",
    description: "",
    requirements: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const jobTypes = ["Full-time", "Part-time", "Internship", "Contract", "Remote", "Freelance"];
  const experienceLevels = ["Fresher", "Junior", "Mid", "Senior"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        title: formData.title,
        company: formData.company,
        location: formData.location,
        salary: {
          min: Number(formData.salaryMin),
          max: Number(formData.salaryMax)
        },
        jobType: formData.jobType,
        experienceLevel: formData.experienceLevel,
        category: formData.category,
        description: formData.description,
        requirements: formData.requirements.split(",").map(req => req.trim()),
        deadline: formData.deadline
      };

      const response = await axios.post("http://localhost:3000/api/jobs/create", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setMessage(response.data.message);
      setFormData({
        title: "",
        company: "",
        location: "",
        salaryMin: "",
        salaryMax: "",
        jobType: "",
        experienceLevel: "Fresher",
        category: "",
        description: "",
        requirements: "",
        deadline: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create a New Job</h2>
      {message && <p className="text-center mb-4 text-blue-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required className="input" />
          <input name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required className="input" />
          <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required className="input" />
          <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" required className="input" />
          <input name="salaryMin" value={formData.salaryMin} onChange={handleChange} type="number" placeholder="Min Salary" className="input" />
          <input name="salaryMax" value={formData.salaryMax} onChange={handleChange} type="number" placeholder="Max Salary" className="input" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select name="jobType" value={formData.jobType} onChange={handleChange} required className="input">
            <option value="">Select Job Type</option>
            {jobTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange} className="input">
            {experienceLevels.map(level => <option key={level} value={level}>{level}</option>)}
          </select>
        </div>

        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" required className="input h-24" />
        <textarea name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Requirements (comma separated)" className="input h-20" />

        <input name="deadline" value={formData.deadline} onChange={handleChange} type="date" className="input" />

        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300" disabled={loading}>
          {loading ? "Posting..." : "Create Job"}
        </button>
      </form>
    </div>
  );
};

export default CreateJobForm;
