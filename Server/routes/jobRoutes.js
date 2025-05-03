const express=require('express');
const router=express.Router();
const {protect}=require('../middlewares/authMiddleware')
const {createJob,getAllJobs,getJobbyId}=require('../controllers/jobControllers')

router.get('/all',getAllJobs);

router.post('/create',protect,createJob);

router.get('/:id',getJobbyId);


module.exports=router;