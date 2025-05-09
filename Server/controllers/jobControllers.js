const asyncHandler = require("express-async-handler");
const Job = require("../model/jobModel");





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

  const addBookmark=asyncHandler(async (req, res) => {
    const {userid, jobid}=req.params;
    const user=await User.findById(userid);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    if (user.bookmarkedJobs.includes(jobid)) {
        res.status(400);
        throw new Error("Job already bookmarked");
    }
    user.bookmarkedJobs.push(jobid);
    await user.save();
    res.status(200).json({ message: "Job bookmarked successfully" });
  })

  module.exports = {
    createJob,
    getAllJobs,
    getJobbyId
};

