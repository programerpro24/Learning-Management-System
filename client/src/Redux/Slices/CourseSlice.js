import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'; 
import axiosInstance from "../../Helper/axiosInstances.js";
import {toast} from 'react-hot-toast'

const initialState = {
    courseData:[]
}

export const getAllCourses = createAsyncThunk("/course/get", async ()=>{
    try{
     const response = axiosInstance.get('/courses'); 
     toast.promise(response, {
        loading:"loading course data...", 
        success: "Courses loaded successfully", 
        error: "Failed to get the courses", 
     }); 

     return (await response).data.courses;             
    }catch(e){
        toast.error("Operation failed")
        throw e
    }
})

export const createNewCourse=createAsyncThunk("/course/create", async(data)=>{
try {
   
   const response = axiosInstance.post('courses', data); 
   toast.promise(response, {
    loading:"Course Creating Please Wait", 
    success:"Course Created Successfully", 
    error:"Course Creating Failed! Try Again"
   })

    return (await response).data

} catch (error) {
    toast.error(error?.response?.data?.message)
    throw error    
 }
})


const courseSlice = createSlice({
    name:"courses", 
    initialState,
    reducers:{}, 
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled, (state, action)=>{
            if(action.payload){
                state.courseData=[...action.payload]
            }
        })
    }
})


//export const { } = courseSlice.actions;  
export default courseSlice.reducer; 