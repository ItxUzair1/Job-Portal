const asyncHandler = require("express-async-handler");
const Job = require("../model/jobModel");
const User=require("../model/usermodel")





const createJob = asyncHandler(async (req, res) => {
    const { title, company, location, salary, jobType, experienceLevel, category, description, requirements, deadline } = req.body;
    console.log(req.body);
    
    if (!title || !company || !location || !jobType || !category || !description) {
        res.status(400);
        throw new Error("Please fill all the required fields");
    }
    
    const job = await Job.create({
        title,
        company,
        location,
        salary,
        jobType,
        experienceLevel,
        category,
        description,
        requirements,
        postedBy: req.user._id,
        deadline
    });
    
    res.status(201).json({ message: "Job created successfully", job });
    }   
);


const getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find().sort({ createdAt: -1 }); // Optional: sorts latest first
    res.status(200).json(jobs);
  });


  const getJobbyId=asyncHandler(async (req, res) => {
    const job=await Job.findById(req.params.id)
    if (!job) {
        res.status(404);
        throw new Error("Job not found");
    }
    res.status(200).json(job);
  } );

const addBookmark = async (req, res) => {
  const { userid, jobid } = req.params;

  try {
    const user = await User.findById(userid);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Avoid duplicates
    if (!user.bookmarkedJobs.includes(jobid)) {
      user.bookmarkedJobs.push(jobid);
      await user.save();
    }

    res.status(200).json({ message: 'Job bookmarked successfully', bookmarkedJobs: user.bookmarkedJobs });
  } catch (error) {
    res.status(500).json({ message: 'Error bookmarking job', error: error.message });
  }
};

const deleteJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;

  const job = await Job.findById(jobId);

  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  // Check if the logged-in user is the one who posted the job
  if (job.postedBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this job");
  }

  await job.deleteOne();

  res.status(200).json({ message: "Job deleted successfully" });
});


// Remove a bookmark
const removeBookmark = async (req, res) => {
  const { userId, jobId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.bookmarkedJobs = user.bookmarkedJobs.filter(id => id.toString() !== jobId);
    await user.save();

    res.status(200).json({ message: 'Job removed from bookmarks', bookmarkedJobs: user.bookmarkedJobs });
  } catch (error) {
    res.status(500).json({ message: 'Error removing bookmark', error: error.message });
  }
};

const getUserBookmarks = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Optional: Only allow users to access their own bookmarks
      if (req.user.id !== userId) {
        return res.status(403).json({ message: 'Not authorized to view these bookmarks.' });
      }
  
      // Fetch the user and populate their bookmarked jobs
      const user = await User.findById(userId).populate('bookmarkedJobs');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send the bookmarked jobs back to the client
      res.status(200).json(user.bookmarkedJobs);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
      res.status(500).json({ message: 'Server error while fetching bookmarks.' });
    }
  };

  const getJobsByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  if (req.user._id.toString() !== userId && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized to view these jobs." });
  }

  const jobs = await Job.find({ postedBy: userId }).sort({ createdAt: -1 });

  res.status(200).json(jobs);
});

const applyToJob = asyncHandler(async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.user._id;

  const job = await Job.findById(jobId);
  if (!job) {
    res.status(404);
    throw new Error("Job not found");
  }

  // Prevent duplicate applications
  if (job.applicants.includes(userId)) {
    res.status(400);
    throw new Error("You have already applied for this job.");
  }

  // Add user to applicants
  job.applicants.push(userId);
  await job.save();

  res.status(200).json({ message: "Applied to job successfully." });
})

const getApplicantsForRecruiterJobs = asyncHandler(async (req, res) => {
  const recruiterId = req.user._id;

  // Fetch jobs posted by this recruiter
  const jobs = await Job.find({ postedBy: recruiterId }).populate('applicants', 'name email'); // populate applicants with name and email only

  // Structure: [{ jobId, title, applicants: [user1, user2...] }, ...]
  const jobApplicants = jobs.map((job) => ({
    jobId: job._id,
    title: job.title,
    applicants: job.applicants, // contains populated user objects
  }));

  res.status(200).json(jobApplicants);
});


  

module.exports = {
  createJob,
  getAllJobs,
  getJobbyId,
  addBookmark,
  removeBookmark,
  getUserBookmarks,
  getJobsByUser,
  deleteJob,
  applyToJob,
  getApplicantsForRecruiterJobs
};
