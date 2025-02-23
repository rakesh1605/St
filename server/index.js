const express=require('express');
const app=express();
const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const paymentRoutes=require("./routes/Payment");
const courseRoutes=require("./routes/Course");
const database=require("./config/database");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const {cloudinaryConnect}=require("./config/cloudinary")
const fileupload=require("express-fileupload");
const Coontactus=require("./routes/Coontactus")
const dotenv=require("dotenv");
dotenv.config();
const PORT= 8000;
//datbase connect
database.connect();
cloudinaryConnect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // Allow all origins
    credentials: true, // Allow cookies
  })
);


app.use(
  fileupload({
    useTempFiles:true,
    tempFileDir:"/temp",
  })
)
//cloudinary connection
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/reach", Coontactus);
//app.get
app.get("/",(req,res)=>{
  return res.json({
    success:true,
    message:'Your server is up and running..'
  });
});
app.listen(PORT,()=>{
  console.log(`APP IS RUNNING AT ${PORT}`)
})