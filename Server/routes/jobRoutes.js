const express=require('express');
const router=express.Router();

router.get('/all',(req,res)=>{
    res.send('All Jobs');
});

router.post('/create',(req,res)=>{  
    res.status(201).json({message:'Job created successfully'});
})


module.exports=router;