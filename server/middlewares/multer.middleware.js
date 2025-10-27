//import all required modules
import path from 'path'; 
import multer from 'multer'; 

//multer configuration
const upload = multer({

    //file size limit
    limits: { fileSize: 30 * 1024 * 1024 }, // 30MB limit

    //storage configuration
    storage:multer.diskStorage({
        destination : 'uploads', 
        filename: (_req, file, cb)=>{
            cb(null, file.originalname);
        }
    }),

    //file filter to allow only images and videos
    fileFilter: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' && ext !== '.webp' && ext !== '.mp4') {
            return cb(new Error('Only .jpg, .jpeg, .png, .webp and .mp4 files are allowed'), false);
        }
        cb(null, true);
    }
})

//export upload middleware
export default upload;