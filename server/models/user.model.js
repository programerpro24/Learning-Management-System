//import all required modules
import {Schema, model} from 'mongoose'; 
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import crypto from 'crypto';


//user schema
const userSchema = new Schema({
    fullName:{
        type : String, 
        required:[true, "full name is required"], 
        minLength:[3, "full name must be at least 3 characters"], 
        maxLength:[25, "full name must be at most 25 characters"],
        lowercase:true,
        trim:true
    }, 
    email:{
        type : String, 
        required:[true, "email is required"], 
        unique:true,
        lowercase:true,
        trim:true, 
        match : [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "please provide a valid email address"]
    }, 
    password:{
        type : String, 
        required:[true, "password is required"], 
        // minLength:[6, "password must be at least 6 characters"], 
        // maxLength:[10, "password must be at most 10 characters"],
        select: false,
        trim:true
    }, 
    avatar:{
        public_id:{
            type:String, 
        }, 
        secure_url:{
            type:String
        }
    },
    role : {
        type : String, 
        enum : ["USER", "ADMIN"],
        default : "USER"                   
    }, 

    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,

    subscription : {
     id : String, 
     status : String
    }

},{timestamps:true})

//pre save hook to hash password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//instance methods
userSchema.methods = {

    //method to generate JWT token
    generateJWTToken: function()
    {
        return jwt.sign
        (
            {   _id:this._id,
                email:this.email, 
                subscription:this.subscription, 
                role:this.role
            }, 
            process.env.JWT_SECRET,
            {
                expiresIn:process.env.JWT_EXPIRY
            }
        ) 
    }, 

    //method to compare password
    comparePassword: async function (plainTextPassword){
        return await bcrypt.compare(plainTextPassword, this.password); 
    }, 

    //method to generate password reset token
    generatePasswordResetToken: async function(){

        const resetToken = crypto.randomBytes(20).toString('hex'); 
        this.forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex'); 
        this.forgotPasswordExpiry = Date.now() + 15*60*1000; //15 minutes
        return resetToken;
    }
}

//create user model
const User = model ('User', userSchema); 

//export user model
export default User;