import {Router} from 'express';
import { submitContactForm } from '../controllers/contact.controller.js';
import  { isLoggedIn, authorizedRoles } from '../middlewares/auth.middleware.js';


const router = Router();

router.post("/contact", submitContactForm); 


export default router