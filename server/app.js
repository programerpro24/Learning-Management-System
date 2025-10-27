import express, { urlencoded } from "express"; 
import cors from "cors"; 
import cookieParser from "cookie-parser";
import morgan from "morgan"; 
import userRoutes from "./routes/user.routes.js"; 
import errorMiddleware from "./middlewares/error.middleware.js";
import courseRoutes from "./routes/course.routes.js";
import contactRoutes from './routes/contact.route.js'; 
import {config} from 'dotenv';

config(); 



const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true,
}))



//ping pong route for checking server is running or not
app.get('/ping', (req, res) => {
    res.send('pong');
});


//three main routed (user, admin, payment)
app.use('/api/v1/user', userRoutes); 
app.use('/api/v1/courses', courseRoutes); 
app.use('/api/v1/contact', contactRoutes); 
 

// 404 Not Found handler 
app.get("*", (req, res) => {
    res.status(404).json({
        Message: "OOPS || 404 page not found"
    });
});

app.use(errorMiddleware); 

export default app;


