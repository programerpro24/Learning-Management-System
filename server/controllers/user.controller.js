//import all required modules
import { send } from 'process';
import User from '../models/user.model.js'; 
import AppError from '../utils/error.util.js';
import cloudinary from 'cloudinary';
import fs from 'fs';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto';


//cookieOptions
const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly : true, 
    secure : true
};

//register Controller
const register = async (req, res, next)=>{

    //get fields from req body
    const {fullName, email, password, role} = req.body; 

    console.log(`${fullName} ${email} ${password}`)
    //validate the fields
    if(!fullName || !email || !password){
        return next(new AppError("all fields are required", 400))
    }

    // find if user already exist
    const userExist = await User.findOne({email}); 

    // if user exist
    if(userExist){
        return next(new AppError("user already exist", 409));
    }

    //create user
    const user = await User.create({
        fullName, 
        email, 
        password,
        role,
        avatar : {
            public_id : " ",
            secure_url : " "
        }, 
    });

    //check if user created successfully or not
    if(!user){
        return next(new AppError("user registration failed, pls try after sometimes", 503)); 
    }

    //if file is present then upload to cloudinary

    if(req.file){
        try{
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder : "lms", 
                width : 250,
                height:250,
                gravity : "face",
                crop : "fill"
            });



            //update user avatar field
            if(result){
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;
            }

            //remove file from server
                fs.rmSync(req.file.path);

        }catch(e){
            return next(new AppError("file upload failed, pls try after sometimes", 503));
        }
    }






    //save user
    await user.save();
    
    //hide password 
    user.password = undefined; 

    //generate token and set cookie
    const token = await user.generateJWTToken(); 
    res.cookie('token', token, cookieOptions); 
    
    //send response after successful registration
    res.status(201).json({
        success :true,
        message:"user registered successfully",
        user
    })
}

//login controller 
const login = async (req, res, next)=>{

    try{
    //get fields from req body
        const { email, password} = req.body; 

    //validate the fields
    if(!email || !password){
        return next(new AppError("all fields are required", 400));
    }

    //find user by email
    const user =  await User.findOne({email}).select("+password"); 

    if(!user){
        return next(new AppError("User does not exist", 404)); 
    }

    const isPasswordValid=await user.comparePassword(password); 
 
    if(!isPasswordValid){
        return next(new AppError("Password is invalid", 401)); 
    }

    //generate token and set cookie
    const token = user.generateJWTToken(); 
    res.cookie('token', token, cookieOptions);
    
    //hide password
    user.password = undefined;

    //send response after successful login
    res.status(200).json({
        success:true, 
        message:"user logged in successfully", 
        user
    })  

    }catch(e){
    //in case of any error
        return next(new AppError(e.message, 500));

    }


}

//logout controller 
const logout = (req, res, next)=>{
    
    try{
    //clear cookie
    res.cookie('token', null, {
        maxAge:0, 
        httpOnly:true, 
        secure:true
    })

    //send response after successful logout
    res.status(200).json({
        success:true,
        message:"user logged out successfully"
    })

    }catch(e){
        //in case of any error
        return next(new AppError(`failed to logout user: ${e.message}`, 500));
    }

}

//getProfile controller 
const getProfile = async(req, res, next)=>{

    try{
    //get user from req.user
    const userId = req.user._id;
    const user = await User.findById(userId);
    
    //send response with user profile
    res.status(200).json({
        success:true,
        message : "user profile fetched successfully",  
        user
    })  

    }catch(e){
        //in case of any error
        return next(new AppError(`failed to fetch user profile: ${e.message}`, 500));
    }
}

//forgot password controller
const forgotPassword = async(req, res, next)=>{
    //get email from req body
    const {email} = req.body;

    //validate email
    if(!email){
        return next(new AppError("email is required", 400));
    }
    
    //find user by email
    const user = await User.findOne({email});

    //if user not found
    if(!user){
        return next(new AppError("user not found with this email", 404));
    }

    //generate reset token
    const resetToken = await user.generatePasswordResetToken();


    //save user
    await user.save();

    //create reset password url
    const resetPasswordURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    //create email subject and message
    const subject = "Password Reset";
    const message = ` you can reset your password using the following link: ${resetPasswordURL}`;


    try{
       await sendEmail(email, subject, message);
         res.status(200).json({
             success:true,
             message:`reset password url sent to ${email} successfully`
         });
    }catch(e){
            user.forgotPasswordToken = undefined;
            user.forgotPasswordExpiry = undefined;
            await user.save();
        return next(new AppError("failed to generate reset password url, pls try after sometimes", 503));
    }
    
}

//reset password controller
const resetPassword = async(req, res, next)=>{
    const {resetToken} = req.params;
    const {password} = req.body;

    const forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    const user = await User.findOne({
        forgotPasswordToken, 
        forgotPasswordExpiry : {$gt : Date.now()}
    });

    if(!user){
        return next(new AppError("invalid or expired reset token", 400));
    }

    user.password = password;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    res.status(201).json({
        success:true,
        message:"password reset successfully"
    });

}


//change password controller
const changePassword = async(req, res, next)=>{
    const {oldPassword, newPassword} = req.body;
    const userId = req.user._id;

    if(!oldPassword || !newPassword){
        return next(new AppError("all fields are required", 400));
    }

    const user = await User.findById(userId).select("+password"); 

    if(!user){
        return next(new AppError("user does not exist", 404));
    }

    const isPasswordValid = await user.comparePassword(oldPassword);

    if(!isPasswordValid){
        return next(new AppError("old password is incorrect", 401));
    }

    user.password = newPassword;
    await user.save();

    user.password = undefined;

    res.status(200).json({
        success:true,
        message:"password changed successfully"
    });
}


const updateUser = async(req, res, next)=>{
    const {fullName} = req.body; 
    const id = req.user._id;

    console.log(req.user)
    console.log(id);

    const user = await User.findById(id); 

    if(!user){
        return next(new AppError("user does not exist")); 
    }

    if(fullName){
        user.fullName=fullName;
    }

    if(req.file){
        //delete existing avatar
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

          //upload new avatar
          try{
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder : "lms", 
                width : 250,
                height:250,
                gravity : "face",
                crop : "fill"
            });

            //update user avatar field
            if(result){
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;
            }

            //remove file from server
                fs.rmSync(req.file.path);

        }catch(e){
            return next(new AppError("file upload failed, pls try after sometimes", 503));
        }
    }

    await user.save(); 

    res.status(200).json({
        success:true, 
        Message:"profile updated successfully",
        user        
    })
}

//export all controllers
export {register, login, logout, getProfile, forgotPassword, resetPassword, changePassword, updateUser};
