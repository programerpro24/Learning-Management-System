import {config} from 'dotenv'; 
import app from './app.js';
import connectionToDb from './config/dbConnection.js';  
import cloudinary from 'cloudinary';

config(); 

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const port = process.env.PORT
app.listen(port, async ()=>{
    await connectionToDb()
    console.log(`server is running on port number ${port}`)
})


