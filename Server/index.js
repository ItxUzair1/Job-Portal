const express=require("express");
const app=express();
const cors=require("cors");
const dot=require("dotenv").config();
const port=process.env.PORT || 5000;
const connectDB=require("./config/database");
const authRoutes=require("./routes/authRoutes");
const errorMiddleware=require("./middlewares/errormiddleware")
const jobRoutes=require("./routes/jobRoutes")

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use("/api/auth",authRoutes);
app.use("/api/jobs",jobRoutes);

app.use(errorMiddleware);

app.listen(port,()=>{
    console.log("Server is running on port "+port);
})