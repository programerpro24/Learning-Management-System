import HomeLayout from '../Layouts/HomeLayout.jsx';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {useState} from 'react';
import {toast} from 'react-hot-toast'
import { login } from '../Redux/Slices/AuthSlice.js';


function Login() {
    const [loginData, setLoginData] = useState({
      email:"", 
      password:"",
    })

    const dispatch = useDispatch(); 
    const navigate = useNavigate(); 


    function handleUserInput(e){
      const {name, value } = e.target; 

      setLoginData({
         ...loginData,
         [name]: value
      })
    }


     async function onLogin(e){
      e.preventDefault(); 

      if(!loginData.email || !loginData.password){
        toast.error("Please Fill All The Details"); 
        return;
      }

      const response = await dispatch(login(loginData)); 
           
       if(response?.payload?.success){
       setLoginData({ 
         email:"", 
         password:"", 
      });

      navigate('/'); 
   } 
}

  return (
    <HomeLayout>
        <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
            <form onSubmit={onLogin} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96
             rounded-2xl shadow-lg duration-700 ease-in-out hover:scale-100 hover:shadow-2xl hover:brightness-110' noValidate>
                <h1 className='text-center text-2xl font-bold'>Login Page</h1>

                <div className='flex flex-col gap-1'>
                  <label htmlFor="email" className='font-semibold'>Email</label>
                  <input 
                  type="email"
                  required 
                  name='email'
                  id='email'
                  placeholder='Enter your email'
                  onChange={handleUserInput}
                  value={loginData.email}
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
                  value={loginData.password}
                  className='bg-transparent px-2 py-1 border focus:outline-none rounded-sm' 
                  />

                <button className='bg-yellow-500 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-lg p-1 text-lg mt-4 font-bold cursor-pointer'>
                    Login
                </button>

                <p className='text-center'> Don't have an account? <Link to='/signup' className='link text-accent '>SignUp</Link></p>
               </div>
            </form>
        </div>
    </HomeLayout>
  )
}

export default Login