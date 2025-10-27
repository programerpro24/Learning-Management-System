import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import axiosInstance from "../../Helper/axiosInstances.js";

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : {},
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
  try {
    const resPromise = axiosInstance.post("/user/register", data);
    toast.promise(resPromise, {
      loading: "Creating your account",
      success: "Register Successfully",
      error: "Failed to create account",
    });
    const response = await resPromise;

    if(response?.data?.success) {
        localStorage.setItem("data", JSON.stringify(response.data?.user));
        localStorage.setItem("isLoggedIn", true); 
        localStorage.setItem("role", response.data?.user?.role);
    }
    return response.data;
  } catch (error) {
    toast.error("Operation failed")
    throw error;
  }
});

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const resPromise = axiosInstance.post("/user/login", data);
    toast.promise(resPromise, {
      loading: "Logging in...",
      success: (res) => res?.data?.message,
      error: "Failed to login account",
    });
    const response = await resPromise;

    if(response?.data?.success) {
        localStorage.setItem("data", JSON.stringify(response.data?.user));
        localStorage.setItem("isLoggedIn", true); 
        localStorage.setItem("role", response.data?.user?.role);
    }

    return response.data;
  } catch (error) {
    toast.error("Operation failed")
    throw error;
  }
});



export const logout = createAsyncThunk("/auth/logout", async () => {
  try {
    const resPromise = axiosInstance.post("/user/logout");
    toast.promise(resPromise, {
      loading: "Please wait! logout in progress...",
      success: (res) => res?.data?.message,
      error: "Failed to logout account",
    });

    const response = await resPromise;
    
    if(response?.data?.success) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        localStorage.removeItem("data");
    }
    console.log(response.data) 
    return response.data;
  } catch (error) {
    toast.error("Operation failed")
    throw error;
  }
});





export const updateProfile = createAsyncThunk("/user/update/profile", async (payload, thunkAPI) => {
  try {
    const [id, data] = payload;
    const resPromise = axiosInstance.put(`/user/update/${id}`, data)
    toast.promise(resPromise, {
      loading: "Please wait! update in progress...",
      success: (res) => res?.data?.message,
      error: "Failed to update",
    });

    const response = await resPromise;
    return response.data;

  } catch (error) {
    toast.error("Operation failed")
    return thunkAPI.rejectWithValue(error?.response?.data || "Operation failed");
  }
});



export const getUserData = createAsyncThunk("/user/details", async () => {
  try {
    const resPromise = axiosInstance.get("/user/me");
    const response = await resPromise;  
     if(response?.data?.success) {
        localStorage.setItem("data", JSON.stringify(response.data?.user));
        localStorage.setItem("isLoggedIn", true); 
        localStorage.setItem("role", response.data?.user?.role);
    }  
    return response.data;
  } catch (error) {
    toast.error(error.message)
    throw error
  }
});





const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
    });

    builder.addCase(createAccount.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.data = {};
      state.role = "";
    });

    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.isLoggedIn = true;
      state.data = action?.payload?.user;
      state.role = action?.payload?.user?.role;
    });  
  },
});


export const { } = authSlice.actions;  
export default authSlice.reducer;


















//import libraries 
// import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'; 
// import {toast} from 'react-hot-toast'; 
// import axiosInstance from '../../Helper/axiosInstances.js'


// const initialState = {
//     isLoggedIn:localStorage.getItem("isLoggedIn") || false,
//     role:localStorage.getItem("role") || "", 
//     data:localStorage.getItem("data") || {}, 
// }; 

// export const createAccount = createAsyncThunk('/auth/signup', async (data)=>{
//     try {
//         const res = axiosInstance.post('/user/register', data); 
//         toast.promise(res, {
//             loading:"Creating your account", 
//             success : (data) => {
//                 return data?.data?.message
//             }, 
//             error:"Failed to create account"
//         })

//         const response = await res;
//         return response.data;

//     } catch (error) {
//         toast.error(error?.response?.data?.message)  
//         throw error;
//     }
// }) 


// export const login = createAsyncThunk('/auth/login', async (data)=>{
//     try {
//         const res = axiosInstance.post('/user/login', data); 
//         toast.promise(res, {
//             loading:"login...", 
//             success : (data) => {
//                 return data?.data?.message
//             }, 
//             error:"Failed to login account"
//         })

//         const response = await res;
//         return response.data;

//     } catch (error) {
//         toast.error(error?.response?.data?.message)  
//         throw error;
//     }
// }) 



// const authSlice = createSlice({
//     name : "auth", 
//     initialState, 
//     reducers:{}, 
//     extraReducers : (builder) =>{
//         builder.addCase(login.fulfilled, (state, action)=>{
//             localStorage.setItem("data", JSON.stringify(action?.payload?.user));
//             localStorage.setItem("isLoggedIn", true); 
//             localStorage.setItem("role", action?.payload?.user?.role);

//             state.isLoggedIn=true; 
//             state.data=action?.payload?.user;
//             state.role=action?.payload?.user?.role;
//         })
//     }
// }); 

// export const { } = authSlice.actions; 
// export default authSlice.reducer; 