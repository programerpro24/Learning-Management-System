//import all required modules
import {Router} from 'express';
import { getProfile, login, logout, register, forgotPassword, resetPassword, changePassword, updateUser} from '../controllers/user.controller.js';
import  {isLoggedIn}  from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

//create router
const router = Router(); 

//user registration route
router.post('/register', upload.single("avatar"), register); 
//user login route
router.post('/login', login); 
//user logout route
router.post('/logout', logout); 
//user profile route
router.get('/me', isLoggedIn, getProfile); 
//forgot password route
router.post('/reset', forgotPassword);
//reset password route
router.post('/reset/:resetToken', resetPassword);
//change password route
router.post('/change-password', isLoggedIn, changePassword);
//update user route
router.put('/update/:id', isLoggedIn, upload.single("avatar"), updateUser); 


//export router
export default router;

