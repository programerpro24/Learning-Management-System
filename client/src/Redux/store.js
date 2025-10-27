//import libraries 
import {configureStore} from '@reduxjs/toolkit'; 
import authReducer from './Slices/AuthSlice.js';
import courseSliceReducer from './Slices/CourseSlice.js';
import lectureSliceReducer from './Slices/lectureSlice.js'



const store = configureStore({
    reducer:{
       auth: authReducer,
       course: courseSliceReducer,
       lecture:lectureSliceReducer
    }, 

    devTools:true 
})


export default store; 
