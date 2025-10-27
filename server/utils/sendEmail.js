//import all required modules
import nodemailer from 'nodemailer';

//function to send email
const sendEmail = async function(email, subject, message){
    //create transporter
    const transporter = nodemailer.createTransport({
        secure:true,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        }
    });

    //send email
    await transporter.sendMail({
        from: process.env.SMTP_FROM_EMAIL,
        to:email,
        subject:subject,
        html:message
    });
};

//export sendEmail function
export default sendEmail;
