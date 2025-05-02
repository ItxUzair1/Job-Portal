const asyncHandler = require("express-async-handler");
const Job = require("../model/jobModel");


const createJob = asyncHandler(async (req, res) => {
    const { title, company, location, salary, jobType, experienceLevel, category, description, requirements, deadline } = req.body;
    
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