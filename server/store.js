import sampleCourses from "./sampleData/data.js";
import Course from "./models/course.model.js";
import mongoose from "mongoose";



const set = async () => {
    try{

        await mongoose.connect("mongodb+srv://shivamsrivastavaengg2022_db_user:ICyOD9aPvDbLzaat@lms.pm1q6l0.mongodb.net/");
        console.log("connection successful");  
       
        await Course.deleteMany();
        console.log("existing data deleted"); 
        
        await Course.insertMany(sampleCourses); 
        console.log(`Everything is well, ${sampleCourses.length} course save successfully`); 

    }catch(e){
        console.log(e.message); 

    } finally{
         await mongoose.connection.close(); 
        console.log("mongoose ka connection successfully band kar diya gaya hai");
    }

}


set(); 