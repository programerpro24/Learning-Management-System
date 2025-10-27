import Contact from '../models/contact.model.js';
import AppError from "../utils/error.util.js";



const submitContactForm = async (req, res) => {
    const { name, email, message } = req.body;


    if (!name || !email || !message) {
        return next(new AppError("all fields are required", 400))
    }

    try {     
        const newContactMessage = await Contact.create({
            name,
            email,
            message
        });

        res.status(201).json({
            success: true,
            message: 'Your message has been submitted successfully!',
            data: newContactMessage
        });

    } catch (error) {
        return res.status(503).json({
            success:false, 
            message:"Something went wrong pls try after some time"
        })
    }
};


export {submitContactForm}