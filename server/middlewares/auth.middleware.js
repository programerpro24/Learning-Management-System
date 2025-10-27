//import all required modules
import jwt from 'jsonwebtoken'; 
import AppError from '../utils/error.util.js';

//middleware to check if user is logged in
const isLoggedIn = async(req, res, next) => {
    try{
        const {token} = req.cookies; 
        if(!token){
            return next(new AppError("you are not logged in ! please log in to access this resource", 401));
        }   

        const userDetails = jwt.verify(token, process.env.JWT_SECRET); 
        if(!userDetails){
            return next(new AppError("invalid token or user does not exist", 406));
        }
        req.user = userDetails;
        next();

    }catch(e){
        return next(new AppError(`failed to check user login status: ${e.message}`, 500));
    }
}

const authorizedRoles = (...roles) => async(req, res, next)=>{
    const currentUserRoles = req.user.role; 

    if( !roles.includes(currentUserRoles)){
      return next(new AppError("You don't have permission to perform any task", 403));

    }

    next()
}

//export isLoggedIn middleware
export {isLoggedIn, authorizedRoles};
