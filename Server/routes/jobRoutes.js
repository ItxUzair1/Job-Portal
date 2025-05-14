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

// Public Routes
router.get('/all', getAllJobs);
router.get('/:id', getJobbyId);

// Protected Routes
router.post('/create', protect, createJob);
router.post('/bookmark/:userid/:jobid',protect, addBookmark);
router.delete('/bookmark/:userId/:jobId', protect, removeBookmark);
router.get('/users/:userId/bookmarks', protect, getUserBookmarks);


module.exports = router;
