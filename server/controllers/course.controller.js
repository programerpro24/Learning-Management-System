//import all required modules
import courseModel from "../models/course.model.js"
import AppError from "../utils/error.util.js";
import fs from 'fs/promises';
import cloudinary from 'cloudinary';



// getAllCourses Controller 
const getAllCourses = async function(req, res, next){

    try{
    const courses = await courseModel.find({}).select('-lectures');    
    if(courses.length==0){
        return next (new AppError('Courses is not available', 404))
    }

    res.status(200).json({
        success:true, 
        message : 'Courses fetched successfully', 
        courses, 
    })
    }catch(e){
        return next(new AppError(e.message, 500))
    }
}

//getLecturesByCourseId
const getLecturesByCourseId = async function(req, res, next){
    try{
        const {id} = req.params; 
        const course = await courseModel.findById(id)

        if(!course){
          return next(new AppError('Course is not fount for ID which is provided by you', 404));  
        }

        res.status(200).json({
            success:true, 
            message:"course lectures fetch successfully", 
            lectures:course.lectures
        })

    }catch(e){
        return next(new AppError(e.message, 500))
    }
}

const createCourse = async(req, res, next) => {
    // Data from req.body
    const { title, description, category, createdBy } = req.body;
    
    // Cloudinary data store karne ke liye variable
    let thumbnailData = {}; 

    try {
        // 2. Initial Data Validation
        if (!title || !description || !category || !createdBy) {

            // Agar koi field missing hai, toh uploaded local file delete karein (agar exist karta hai)
            if (req.file) {
                await fs.rm(req.file.path); 
            }
            return next(new AppError('All fields (title, description, category, createdBy) are required', 400));
        }

        // 3. Thumbnail File and Cloudinary Upload Handling
        if (req.file) {       
            // Upload file to Cloudinary
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms', // Cloudinary me specific folder name
            });
            
            //assign values
            if (result) {
                thumbnailData = {
                    public_id: result.public_id,
                    secure_url: result.secure_url
                };
            }
            
            //Delete local file, chahe Cloudinary upload fail hua ho ya pass
            await fs.rm(req.file.path).catch(err => console.error("Local file cleanup failed:", err)); 

        } 
        
        //Final check for Thumbnail
        if (!thumbnailData.public_id) {
            return next(new AppError('Thumbnail image is required and failed to upload to the server.', 503));
        }

        //Course Document Creation
        const course = await courseModel.create({
            title, 
            description, 
            category, 
            createdBy,
            thumbnail: thumbnailData, 
        });

        //Course creation check
        if (!course) {
            // Agar DB me save nahi hua toh Cloudinary se bhi delete kar dein
            await cloudinary.uploader.destroy(thumbnailData.public_id);
            return next(new AppError("Course could not be created, please try again", 503)); 
        }

        // 7. Success Response
        res.status(201).json({ 
            success: true,
            message: 'Course created successfully',
            course,
        });

    } catch (e) {
        //Global Error Handling and Cleanup
        
        // Agar Cloudinary par upload ho gaya tha aur DB error aaya, toh Cloudinary se delete karein
        if (thumbnailData.public_id) {
            await cloudinary.uploader.destroy(thumbnailData.public_id);
        }
        
        // Final error response
        return next(new AppError(e.message, 500));
    }
};

//update course controller
const updateCourse = async(req, res, next)=>{
try{
    const {id} = req.params; 
    const course = await courseModel.findByIdAndUpdate(id, 
        {$set:req.body}, 
        {new:true, runValidators:true}
    );
    
    if(!course){
     return next(new AppError('Course with this id does not exist', 500));         
    }

    res.status(201).json({
        success:true, 
        message:"course updated successfully",
        course
    })

}catch(e){
    return next(new AppError(e.message, 500)); 
}
}

//remove course controller
const removeCourse = async(req, res, next)=>{
try{
    const {id} = req.params; 

    const course = await courseModel.findById(id); 

    if(!course){
        return next(new AppError("course is not exist", 500)); 
    }

   await course.deleteOne({id}); 


    res.status(201).json({
        success:true,
        message:"Course deleted successfully", 
    })

}catch(e){
    return next(new AppError(e.message, 500))
}
}

//add lecture by course id
const addLectureByCourseId = async(req, res, next)=>{

    try{
    const {title, description} = req.body; 
    const {id} = req.params; 

    console.log("title :" +title+ "description :" + id); 

    if(!title || !description){
        return next(new AppError("All fields are required"), 500);
    }

    const course = await courseModel.findById(id);
    
    if(!course){
        return next(new AppError("course does not exist"), 404); 
    }

    let lectureData={
        title, 
        description,
        lecture:{}
    }


try{    
    if(req.file){
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'lms_lectures', 
                resource_type:'video',
            });
            
            if (result) {
                lectureData.lecture = {
                public_id: result.public_id,
                secure_url: result.secure_url
            };
            
            }
            
            //Delete local file, chahe Cloudinary upload fail hua ho ya pass
            await fs.rm(req.file.path).catch(err => console.error("Local file cleanup failed:", err)); 
        } 

    }catch(e){
        return next(new AppError(e.message), 500)
    }


        //Final check for Thumbnail
        if (!lectureData.lecture.public_id) {
        return next(new AppError('Failed to get secure URL/ID for the uploaded lecture.', 500));
        }


       course.lectures.push(lectureData);
       course.numbersOfLectures = course.lectures.length;

           console.log("title :" +title+ "description :" + id + "course lectures:" + course.lectures.secure_url);

           
        await course.save();

        res.status(201).json({
            success:true, 
            message:"Lectures upload successfully", 
            course
        })

    }catch(e){
        return next (new AppError(e.message, 500))
    }

}


//Export all controllers
export {getAllCourses, getLecturesByCourseId, createCourse, updateCourse, removeCourse, addLectureByCourseId}; 