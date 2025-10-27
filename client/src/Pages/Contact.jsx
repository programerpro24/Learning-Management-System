import { useState } from 'react';
import HomeLayout from '../Layouts/HomeLayout';
import { toast } from 'react-hot-toast';
import { isEmail } from '../Helper/regesMatcher';
import axiosInstance from '../Helper/axiosInstances';

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Handle input changes
  function handleInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  }

  // Handle form submit
  async function onFormSubmit(e) {
    e.preventDefault();

    
    // Validation checks
    if (!userInput.name || !userInput.email || !userInput.message) {
      toast.error("All fields are required");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid EmailId");
      return;
    }

    try {
        const response = axiosInstance.post('/contact/contact', userInput); 
        toast.promise(response, {
            loading:"Submitting your message", 
            success:"Message submitted successfully!", 
            error:"Failed to submit the form"
        })

        const contactResponse = await response; 

        if(contactResponse?.data?.success){
            setUserInput({
            name: "",
            email: "",
            message: ""
        });
    }
    } catch (error) {
     toast.error("Operation failed")
     throw err
    }    
  }

  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-[100vh] bg-gray-900">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col justify-center items-center gap-4 p-6 rounded-2xl shadow-lg text-white bg-gray-800 hover:shadow-2xl transition-all duration-700 ease-in-out"
          noValidate
        >
          <h1 className="text-3xl font-semibold mb-2">Contact Us</h1>

          {/* Name Field */}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={userInput.name}
              onChange={handleInput}
              className="bg-transparent px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 w-[300px]"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={userInput.email}
              onChange={handleInput}
              className="bg-transparent px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 w-[300px]"
            />
          </div>

          {/* Message Field */}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Message for us..."
              value={userInput.message}
              onChange={handleInput}
              className="bg-transparent px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 w-[300px] h-[150px] resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg mt-3 transition-all duration-300 ease-in-out w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Contact;


















// import {useState} from 'react'; 
// import HomeLayout from '../Layouts/HomeLayout'; 
// import {toast} from 'react-hot-toast'; 
// import { isEmail } from '../Helper/regesMatcher';


// function Contact() {
//  const [userInput, setUserInput] = useState({
//     name:"", 
//     email:"", 
//     message:""
//  })

// function handleInput(e){
//     const {name, value} = e.target
//     console.log(`${name}, ${value}`)

//     setUserInput({
//         ...userInput,
//         [name]: value
//     })
// }



// async function onFormSubmit(e){
// e.preventDefault(); 

// console.log(`${userInput} user input check akr raha hu`)
// console.log(`${userInput.name}, ${userInput.email}, ${userInput.message}`)

// if( !userInput.name || !userInput.email || !userInput.message ){
//     toast.error("All fields all required")
//     return
// }

// if(!isEmail(userInput.email)){
// toast.error("Invalid EmailId");
//     return;
// };

// setUserInput({
//         name: "",
//         email: "",
//         message: ""
// });
// }

//   return (
//     <HomeLayout>
//         <div className='flex justify-center items-center h-[100vh]'>
//             <form onSubmit={onFormSubmit} className='flex flex-col justify-center items-center gap-2 p-5 rounded-md text-white  rounded-2xl shadow-lg duration-700 ease-in-out hover:scale-100 hover:shadow-2xl hover:brightness-110' noValidate>
//                 <h1 className='text-3xl font-semibold'>Contact Us</h1>
//                 <div className='flex flex-col w-full gap-1'>
//                     <label htmlFor="name" className='text-xl font-semibold'>Name</label>
//                     <input
//                     type="text"
//                     id='name'
//                     name='name'
//                     placeholder='Enter your name'
//                     value={userInput.name}
//                     onChange={handleInput}   
//                     className='bg-transparent px-2 py-1 border focus:outline-none rounded-sm w-[300px]'                
//                     />
//                 </div>
//                 <div className='flex flex-col w-full gap-1'>
//                     <label htmlFor="email" className='text-xl font-semibold'>Email</label>
//                     <input
//                     type="email"
//                     id='email'
//                     name='email'
//                     placeholder='Enter your email'
//                     value={userInput.email} 
//                     onChange={handleInput}   
//                     className='bg-transparent px-2 py-1 border focus:outline-none rounded-sm w-[300px]'                
//                     />
//                 </div>
//                 <div className='flex flex-col w-full gap-1'>
//                     <label htmlFor="message" className='text-xl font-semibold'>Message</label>
//                     <textarea 
//                     name="message" 
//                     id="message"
//                     placeholder='Message For Us'
//                     value={userInput.message}
//                     onChange={handleInput}
//                     className='bg-transparent px-2 py-1 border focus:outline-none rounded-sm w-[300px] h-[200px]'
//                     />                   
//                 </div>
//                  <button className='bg-yellow-500 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-lg p-1 text-lg mt-4 font-bold cursor-pointer w-full'>
//                     Submit
//                 </button>
//             </form>
//         </div>
//     </HomeLayout>
//   )
// }

// export default Contact