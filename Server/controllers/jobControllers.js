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
  

module.exports = {
  createJob,
  getAllJobs,
  getJobbyId,
  addBookmark,
  removeBookmark,
  getUserBookmarks
};
