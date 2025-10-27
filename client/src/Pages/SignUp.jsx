import HomeLayout from '../Layouts/HomeLayout.jsx';
import {useState} from 'react';
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-hot-toast'
import { createAccount } from '../Redux/Slices/AuthSlice.js';
import { isEmail } from '../Helper/regesMatcher';
import { isValidPassword } from '../Helper/regesMatcher';

function SignUp() {
    const [previewImage, setPreviewImage] = useState(""); 
    const [signupData, setSignupData] = useState({
      fullName:"",
      email:"", 
      password:"", 
      avatar:"" 
    })

    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 

    function handleUserInput(e){
      const {name, value } = e.target; 

      setSignupData({
         ...signupData,
         [name]: value
      })
    }


    function getImage(e){
      const uploadedImage = e.target.files[0]; 
      if(uploadedImage){
        setSignupData({
          ...signupData, 
          avatar:uploadedImage 
        })

        const fileReader = new FileReader(); 
      fileReader.readAsDataURL(uploadedImage); 
      fileReader.addEventListener("load", function(){
        setPreviewImage(this.result)
      })
    }
  }

    async function createNewAccount(e){
      e.preventDefault(); 

      if(!signupData.fullName || !signupData.email || !signupData.password || !signupData.avatar){
        toast.error("Please Fill All The Details"); 
        return;
      }

      if(signupData.fullName.length<3){
        toast.error("Name should be alteast 3 character");
         return;
      };

      if(!isEmail(signupData.email)){
        toast.error("Invalid Email");
         return;
      };

      if(!isValidPassword(signupData.password)){
        toast.error("password should have : 8 char, atleast one uppercase letter, one lowercase letter, one number, one special character");
         return;
      };

      const formData = new FormData();
      
      formData.append("fullName", signupData.fullName); 
      formData.append("email", signupData.email);
      formData.append("password", signupData.password);
      formData.append("avatar", signupData.avatar);

      //disptach create account action
      const response = await dispatch(createAccount(formData)); 
      console.log(response); 
      
      if(response?.payload?.success){
      setSignupData({
        fullName:"", 
        email:"", 
        password:"", 
        avatar:"",
      }); 
      setPreviewImage("");
      navigate('/'); 
      } 
    }

  return (
    <HomeLayout>
        <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
            <form onSubmit={createNewAccount} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96
             rounded-2xl shadow-lg duration-700 ease-in-out hover:scale-100 hover:shadow-2xl hover:brightness-110' noValidate>
                <h1 className='text-center text-2xl font-bold'>Registration Page</h1>
                <label htmlFor="image_uploads" className='cursor-pointer'>
                  {previewImage 
                  ? (<img className='w-24 h-24 rounded-full m-auto' src={previewImage}/>) 
                  : (<BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>)}                    
                </label>
                <input 
                type="file"
                name='image_uploads'
                id='image_uploads'
                accept='.jpg, jpeg, .png, .svg'  
                onChange={getImage}
                className="hidden"
                />

                <div className='flex flex-col gap-1'>
                  <label htmlFor="fullName" className='font-semibold'>FullName</label>
                  <input 
                  type="text"
                  required 
                  name='fullName'
                  id='fullName'
                  placeholder='Enter your name'
                  onChange={handleUserInput}
                  value={signupData.fullName}
                  className='bg-transparent px-2 py-1 border  focus:outline-none rounded-sm'
                  />
                  <label htmlFor="email" className='font-semibold'>Email</label>
                  <input 
                  type="email"
                  required 
                  name='email'
                  id='email'
                  placeholder='Enter your email'
                  onChange={handleUserInput}
                  value={signupData.email}
                  className='bg-transparent px-2 py-1 border focus:outline-none rounded-sm'
                  />
                  <label htmlFor="password" className='font-semibold'>Password</label>
                  <input 
                  type="password"
                  required 
                  name='password'
                  id='password'
                  placeholder='Enter your password'
                  onChange={handleUserInput}
                  value={signupData.password}
                  className='bg-transparent px-2 py-1 border focus:outline-none rounded-sm' 
                  />
                <button className='bg-yellow-500 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-lg p-1 text-lg mt-4 font-bold cursor-pointer'>
                    create
                </button>
                <p className='text-center'>Already have an account ? <Link to='/login' className='link text-accent '>login</Link></p>
                </div>
            </form>
        </div>
    </HomeLayout>
  )
}

export default SignUp