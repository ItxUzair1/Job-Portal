const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
  createJob,
  getAllJobs,
  getJobbyId,
  addBookmark,
  removeBookmark,getUserBookmarks
} = require('../controllers/jobControllers');
const User=require("../model/usermodel")
const Job=require("../model/jobModel")

// Public Routes
router.get('/all', getAllJobs);
router.get('/:id', getJobbyId);

// Protected Routes
router.post('/create', protect, createJob);
router.post('/bookmark/:userid/:jobid',protect, addBookmark);
router.delete('/bookmark/:userId/:jobId', protect, removeBookmark);
router.get('/users/:userId/bookmarks', protect, getUserBookmarks);
// Example route
router.get('/bookmarked/:userId',protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const bookmarkedJobs = await Job.find({
      _id: { $in: user.bookmarkedJobs },
    });

    res.json(bookmarkedJobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;
