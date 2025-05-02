const asyncHandler=require("express-async-handler")
const User=require("../model/usermodel")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")


const Register=asyncHandler(async (req,res)=>{
    const {name,email,password,role}=req.body
    if(!name || !email || !password || !role){
        res.status(400)
        throw new Error("Please fill all the fields")
    }
    const userExist=await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error("User already exists")
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const user=await User.create({
        name,
        email,
        password:hashedPassword,
        role,
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id,email,role)
        })
    }
    else{
        res.status(400)
        throw new Error("User not found")
    }
})

const Login=asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    if(!email || ! password){
        res.status(400)
        throw new Error("Please fill all the fields")
    }
    const user=await User.findOne({email})
    if(!user){
        res.status(400)
        throw new Error("User not found")
    }
    const isMatch=await bcrypt.compare(password,user.password)

    if(user && isMatch){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id,email,user.role)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid credentials")
    }
})




const generateToken=(id,email,role)=>{
    return jwt.sign({id,email,role},process.env.JWT_SECRET,{expiresIn:"30d"})
}


module.exports={
    Register,
    Login
}